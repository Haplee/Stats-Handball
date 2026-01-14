from flask import Blueprint, request, jsonify, current_app, send_file
import os
import io
import pandas as pd

from ..models.video import Video
from ..extensions import db
from ..utils.handball_utils import (
    generar_nombre_unico,
    es_archivo_valido,
    obtener_info_archivo
)

api_rutas = Blueprint('api', __name__)

# ---------------------------
# SUBIR VIDEO
# ---------------------------
@api_rutas.route('/upload', methods=['POST'])
def subir_video_partido():

    if 'file' not in request.files:
        return jsonify({"error": "No has mandado ningún archivo"}), 400
        
    archivo = request.files['file']

    if archivo.filename == '':
        return jsonify({"error": "El nombre del archivo está vacío"}), 400
        
    if not es_archivo_valido(archivo.filename):
        return jsonify({"error": "Formato no permitido. Solo aceptamos MP4, MOV o AVI"}), 400

    nombre_unico = generar_nombre_unico(archivo.filename)

    directorio_subidas = current_app.config['UPLOAD_FOLDER']
    os.makedirs(directorio_subidas, exist_ok=True)

    ruta_guardado = os.path.join(directorio_subidas, nombre_unico)
    archivo.save(ruta_guardado)

    tamano_mb = obtener_info_archivo(ruta_guardado)

    nuevo_video = Video(
        nombre_fichero=nombre_unico,
        ruta_fichero=ruta_guardado,
        estado='pending',
        tamano_mb=tamano_mb  # solo si existe en tu modelo
    )

    db.session.add(nuevo_video)
    db.session.commit()

    current_app.celery.send_task(
        'process_video_task',
        args=[nuevo_video.id, nombre_unico]
    )

    return jsonify({
        "mensaje": "Vídeo subido de lujo. Me pongo a analizarlo ahora mismo.",
        "filename": nombre_unico,
        "video_id": nuevo_video.id,
        "size_mb": tamano_mb
    }), 202


# ---------------------------
# SUBIR DESDE YOUTUBE
# ---------------------------
@api_rutas.route('/upload-url', methods=['POST'])
def procesar_enlace_youtube():

    datos = request.get_json()
    url = datos.get('url')
    
    if not url or ('youtube.com' not in url and 'youtu.be' not in url):
        return jsonify({"error": "Ese enlace no parece de Youtube..."}), 400

    video_youtube = Video(
        enlace_youtube=url,
        nombre_fichero=f"YouTube: {url[:30]}...",
        estado='pending'
    )

    db.session.add(video_youtube)
    db.session.commit()

    current_app.celery.send_task(
        'process_video_task',
        args=[video_youtube.id, None, url]
    )

    return jsonify({
        "mensaje": "Enlace recibido. Voy a por el vídeo a Youtube.",
        "video_id": video_youtube.id
    }), 202


# ---------------------------
# LISTAR VIDEOS
# ---------------------------
@api_rutas.route('/videos', methods=['GET'])
def listar_todos_los_videos():
    partidos = Video.query.all()
    return jsonify([p.a_diccionario() for p in partidos]), 200


# ---------------------------
# ESTADO DE UN VIDEO
# ---------------------------
@api_rutas.route('/videos/<int:id_video>', methods=['GET'])
def ver_estado_partido(id_video):
    partido = Video.query.get_or_404(id_video)
    return jsonify(partido.a_diccionario()), 200


# ---------------------------
# EXPORTAR EXCEL
# ---------------------------
@api_rutas.route('/videos/<int:id_video>/exportar', methods=['GET'])
def exportar_estadisticas_excel(id_video):

    partido = Video.query.get_or_404(id_video)
    datos = [partido.a_diccionario()]

    df = pd.DataFrame(datos)

    output = io.BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Stats_Handball')

    output.seek(0)

    nombre_archivo = f"Estadisticas_Partido_{id_video}.xlsx"

    return send_file(
        output,
        as_attachment=True,
        download_name=nombre_archivo,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
