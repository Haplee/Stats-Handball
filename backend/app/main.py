from flask import Flask, jsonify
from .config import Config
from .extensions import db, migrate
from .routes.api import api_bp
from .celery_utils import make_celery
import os

def create_app(config_class=Config):
    """
    Factory function to create and configure the Flask application.
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Initialize Celery
    celery = make_celery(app)
    app.celery = celery

    # Register blueprints
    app.register_blueprint(api_bp, url_prefix='/api')

    # A simple health check endpoint
    @app.route('/health')
    def health_check():
        return jsonify({"status": "healthy"}), 200

    # Create upload folder if it doesn't exist
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    return app
