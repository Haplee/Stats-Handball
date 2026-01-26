import pytest
import sys
import os

# Add the backend directory to sys.path so we can import 'app'
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.main import crear_app
from app.extensions import db
from app.config import Config

class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    WTF_CSRF_ENABLED = False
    # Use a dummy redis for testing or mock it? 
    # For now we might want to mock Celery or let it be.
    CELERY_BROKER_URL = 'memory://'
    CELERY_RESULT_BACKEND = 'db+sqlite:///results.db'

@pytest.fixture
def app():
    app = crear_app(TestConfig)
    
    # Mock celery to avoid connection errors during tests if redis isn't there
    app.celery.conf.update(task_always_eager=True)

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def runner(app):
    return app.test_cli_runner()
