from flask import Flask, jsonify
from .config import Config
from .extensions import db, migrate
from .routes.api import api_rutas
from .routes.auth import auth_routes
from .celery_utils import make_celery
from .models.video import Video
from .models.user import User
import os

def crear_app(config_class=Config):
    """
    Función principal para configurar el servidor de Flask.
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Inicializamos la base de datos y las migraciones
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Configurar sesiones para autenticación
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
    
    # Permitimos que el frontend se conecte sin problemas
    from flask_cors import CORS
    CORS(app, supports_credentials=True)

    # Arrancamos Celery para las tareas en segundo plano
    celery = make_celery(app)
    app.celery = celery

    # Registramos las rutas de nuestra API
    app.register_blueprint(api_rutas, url_prefix='/api')
    app.register_blueprint(auth_routes, url_prefix='/api/auth')

    # Un pequeño test para ver si el servidor responde
    @app.route('/health')
    def test_servidor():
        return jsonify({"estado": "funcionando", "servidor": "ok"}), 200

    # Nos aseguramos de que la carpeta de subidas esté lista
    ruta_subidas = app.config['UPLOAD_FOLDER']
    if not os.path.exists(ruta_subidas):
        os.makedirs(ruta_subidas)

    # Crear las tablas de la base de datos si no existen
    with app.app_context():
        db.create_all()

    return app
