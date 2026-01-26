from flask import Blueprint, request, jsonify, current_app, session
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


def login_required(f):
    from functools import wraps
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({"error": "No estás autenticado"}), 401
        return f(*args, **kwargs)
    return decorated_function


@api_rutas.route('/upload', methods=['POST'])
@login_required
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

        # Creamos la ficha en la base de datos asociada al usuario
        nuevo_video = Video(
            nombre_fichero=nombre_limpio,
            ruta_fichero=ruta_guardado,
            estado='pending',
            user_id=session['user_id']
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
@login_required
def procesar_enlace_youtube():
    """
    Pilla un enlace de Youtube y lo manda al worker para que se lo baje.
    """
    datos = request.get_json()
    url = datos.get('url')

    if not url or ('youtube.com' not in url and 'youtu.be' not in url):
        return jsonify({"error": "Ese enlace no parece de Youtube..."}), 400

    # Creamos el registro como pendiente asocidado al usuario
    video_youtube = Video(
        enlace_youtube=url,
        nombre_fichero=f"YouTube: {url[:30]}...",
        estado='pending',
        user_id=session['user_id']
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
@login_required
def listar_todos_los_videos():
    """
    Devuelve la lista de los partidos DE ESTE USUARIO.
    """
    partidos = Video.query.filter_by(user_id=session['user_id']).options(db.defer(Video.resultados)).all()
    return jsonify(
        [p.a_diccionario(include_results=False) for p in partidos]
    ), 200


@api_rutas.route('/videos/<int:id_video>', methods=['GET'])
@login_required
def ver_estado_partido(id_video):
    """
    Consulta cómo va el análisis de un partido concreto.
    """
    partido = Video.query.get_or_404(id_video)
    
    # Comprobamos seguridad
    if partido.user_id != session['user_id']:
        return jsonify({"error": "No tienes permiso para ver este video"}), 403

    return jsonify(partido.a_diccionario()), 200


@api_rutas.route('/videos/<int:id_video>', methods=['DELETE'])
@login_required
def borrar_video(id_video):
    """
    Borra un video y sus archivos asociados.
    """
    partido = Video.query.get_or_404(id_video)
    
    # Comprobamos seguridad
    if partido.user_id != session['user_id']:
        return jsonify({"error": "No tienes permiso para borrar este video"}), 403

    try:
        # Borrar archivo físico si existe y es local
        if partido.ruta_fichero and os.path.exists(partido.ruta_fichero):
            os.remove(partido.ruta_fichero)
        
        db.session.delete(partido)
        db.session.commit()
        return jsonify({"mensaje": "Video eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al borrar: {str(e)}"}), 500
