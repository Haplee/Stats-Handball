from flask import Flask, jsonify
from .config import Config
from .extensions import db, migrate
from .routes.api import api_rutas
from .routes.auth import auth_routes
from .routes.teams import teams_bp
from .routes.players import players_bp
from .routes.tactics import tactics_bp
from .celery_utils import make_celery
from .models import Video, User, Team, Player, Tactic
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
    app.register_blueprint(teams_bp, url_prefix='/api/teams')
    app.register_blueprint(players_bp, url_prefix='/api/players')
    app.register_blueprint(tactics_bp, url_prefix='/api/tactics')

    # Un pequeño test para ver si el servidor responde
    @app.route('/health')
    def test_servidor():
        return jsonify({"estado": "funcionando", "servidor": "ok"}), 200

    # Nos aseguramos de que la carpeta de subidas esté lista
    # También creamos las carpetas para imágenes estáticas
    ruta_subidas = app.config['UPLOAD_FOLDER']
    static_images = os.path.join(app.root_path, 'static', 'images')
    
    for path in [ruta_subidas, 
                 os.path.join(static_images, 'teams'),
                 os.path.join(static_images, 'players'),
                 os.path.join(static_images, 'tactics')]:
        if not os.path.exists(path):
            os.makedirs(path)

    # Crear las tablas de la base de datos si no existen
    with app.app_context():
        db.create_all()

    return app
