import pytest
import json
import os
import sys

# Ensure backend can be imported
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from backend.app.main import crear_app
from backend.app.extensions import db
from backend.app.models.video import Video
from backend.app.config import Config

class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    TESTING = True

@pytest.fixture
def app():
    app = crear_app(TestConfig)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def init_db(app):
    with app.app_context():
        db.create_all()
        yield db
        db.session.remove()
        db.drop_all()

def test_listar_videos_no_results(client, init_db):
    """
    Test that the list endpoint does NOT return the 'results' field.
    """
    # Create a video with results
    with client.application.app_context():
        video = Video(
            nombre_fichero='test_video.mp4',
            estado='completado',
            progreso=100,
            resultados={'heavy': 'data', 'score': 100}
        )
        db.session.add(video)
        db.session.commit()

    # Get the list
    response = client.get('/api/videos')
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 1

    video_data = data[0]
    assert 'id' in video_data
    assert 'filename' in video_data
    assert 'status' in video_data
    # 'results' should NOT be present
    assert 'results' not in video_data

def test_ver_video_has_results(client, init_db):
    """
    Test that the single video endpoint DOES return the 'results' field.
    """
    # Create a video with results
    with client.application.app_context():
        video = Video(
            nombre_fichero='test_video.mp4',
            estado='completado',
            progreso=100,
            resultados={'heavy': 'data', 'score': 100}
        )
        db.session.add(video)
        db.session.commit()
        video_id = video.id

    # Get the single video
    response = client.get(f'/api/videos/{video_id}')
    assert response.status_code == 200
    data = response.get_json()

    assert 'id' in data
    assert 'results' in data
    assert data['results']['score'] == 100
