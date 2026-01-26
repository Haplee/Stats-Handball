from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
from ..models.video import Video
from ..extensions import db

# Definimos el blueprint para las rutas de la API
api_rutas = Blueprint('api', __name__)


def es_formato_permitido(nombre_archivo):
    """
    Comprobamos que el vídeo tenga una extensión de las que nos gustan.
    """
    extensiones = {'mp4', 'mov', 'avi'}
    return '.' in nombre_archivo and \
           nombre_archivo.rsplit('.', 1)[1].lower() in extensiones


@api_rutas.route('/upload', methods=['POST'])
def subir_video_partido():
    """
    Recibe un vídeo por formulario y lo guarda para mandarlo a la cola.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No has mandado ningún archivo"}), 400

    archivo = request.files['file']

    if archivo.filename == '':
        return jsonify({"error": "El nombre del archivo está vacío"}), 400

    if archivo and es_formato_permitido(archivo.filename):
        # Limpiamos el nombre para evitar líos con el sistema de archivos
        nombre_limpio = secure_filename(archivo.filename)

        # Miramos si la carpeta existe, si no, la creamos al vuelo
        directorio_subidas = current_app.config['UPLOAD_FOLDER']
        if not os.path.exists(directorio_subidas):
            os.makedirs(directorio_subidas)

        ruta_guardado = os.path.join(directorio_subidas, nombre_limpio)
        archivo.save(ruta_guardado)

        # Creamos la ficha en la base de datos
        nuevo_video = Video(
            nombre_fichero=nombre_limpio,
            ruta_fichero=ruta_guardado,
            estado='pending'
        )
        db.session.add(nuevo_video)
        db.session.commit()

        # Mandamos el recado al worker de Celery para que empiece a currar
        current_app.celery.send_task(
            'process_video_task', args=[nuevo_video.id, nombre_limpio]
        )

        return jsonify({
            "mensaje": (
                "Vídeo subido de lujo. Me pongo a analizarlo ahora mismo."
            ),
            "filename": nombre_limpio,
            "video_id": nuevo_video.id
        }), 202
    else:
        return jsonify({
            "error": "Formato no permitido. Solo aceptamos MP4, MOV o AVI"
        }), 400


@api_rutas.route('/upload-url', methods=['POST'])
def procesar_enlace_youtube():
    """
    Pilla un enlace de Youtube y lo manda al worker para que se lo baje.
    """
    datos = request.get_json()
    url = datos.get('url')

    if not url or ('youtube.com' not in url and 'youtu.be' not in url):
        return jsonify({"error": "Ese enlace no parece de Youtube..."}), 400

    # Creamos el registro como pendiente
    video_youtube = Video(
        enlace_youtube=url,
        nombre_fichero=f"YouTube: {url[:30]}...",
        estado='pending'
    )
    db.session.add(video_youtube)
    db.session.commit()

    # Le pasamos la pelota al worker
    current_app.celery.send_task(
        'process_video_task', args=[video_youtube.id, None, url]
    )

    return jsonify({
        "mensaje": "Enlace recibido. Voy a por el vídeo a Youtube.",
        "video_id": video_youtube.id
    }), 202


@api_rutas.route('/videos', methods=['GET'])
def listar_todos_los_videos():
    """
    Devuelve la lista de todos los partidos que hemos analizado.
    """
    partidos = Video.query.options(db.defer(Video.resultados)).all()
    return jsonify(
        [p.a_diccionario(include_results=False) for p in partidos]
    ), 200


@api_rutas.route('/videos/<int:id_video>', methods=['GET'])
def ver_estado_partido(id_video):
    """
    Consulta cómo va el análisis de un partido concreto.
    """
    partido = Video.query.get_or_404(id_video)
    return jsonify(partido.a_diccionario()), 200
