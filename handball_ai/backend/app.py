# handball_ai/backend/app.py
import os
import time
from multiprocessing import Process
from flask import Flask, send_from_directory
from .database.db import db
from .database.models import Video
from .routes.video_routes import video_bp
from .routes.stats_routes import stats_bp
from ..ai.detection.yolo_detector import YoloDetector
from ..ai.tracking.tracker import ObjectTracker
from ..ai.actions.action_recognition import recognize_actions
from ..ai.stats.stats_engine import StatsEngine
from ..utils.video_utils import process_video


def video_processing_worker(app):
    """
    Worker que se ejecuta en un proceso separado para analizar vídeos.
    """
    print("Worker de procesamiento de vídeo iniciado.")
    while True:
        with app.app_context():
            # Buscar un vídeo encolado para procesar
            video_to_process = Video.query.filter_by(processing_status='queued').first()

            if video_to_process:
                print(f"Procesando vídeo ID: {video_to_process.id}, Archivo: {video_to_process.filename}")

                # Actualizar estado a 'processing'
                video_to_process.processing_status = 'processing'
                db.session.commit()

                filepath = os.path.join(app.instance_path, 'uploads', video_to_process.filename)

                try:
                    # Inicializar componentes de IA
                    detector = YoloDetector()
                    tracker = ObjectTracker()
                    stats_engine = StatsEngine()

                    # Ejecutar el pipeline de análisis
                    process_video(filepath, detector, tracker, recognize_actions, stats_engine)

                    # Actualizar estado a 'completed'
                    video_to_process.processing_status = 'completed'
                    print(f"Vídeo ID: {video_to_process.id} procesado exitosamente.")

                except Exception as e:
                    video_to_process.processing_status = 'error'
                    print(f"Error procesando vídeo ID {video_to_process.id}: {e}")

                finally:
                    db.session.commit()
            else:
                # Si no hay vídeos, esperar un poco antes de volver a consultar
                time.sleep(10)


def create_app(test_config=None):
    app = Flask(__name__, static_folder='../frontend', static_url_path='/')

    db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'instance')
    db_uri = 'sqlite:///' + os.path.join(db_path, 'handball_ai.db')

    app.config.from_mapping(
        SECRET_KEY='dev',
        SQLALCHEMY_DATABASE_URI=db_uri,
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    if not os.path.exists(db_path):
        os.makedirs(db_path)

    db.init_app(app)

    app.register_blueprint(video_bp, url_prefix='/api/videos')
    app.register_blueprint(stats_bp, url_prefix='/api/stats')

    @app.route('/')
    def serve_index():
        return send_from_directory(app.static_folder, 'index.html')

    @app.route('/<path:path>')
    def serve_static(path):
        return send_from_directory(app.static_folder, path)

    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    # Iniciar el worker de procesamiento en un proceso separado
    # No queremos que el worker se inicie en modo de recarga de Flask (debug=True)
    if os.environ.get('WERKZEUG_RUN_MAIN') != 'true':
        worker_process = Process(target=video_processing_worker, args=(app,))
        worker_process.start()

    app.run(debug=True, port=5000)
