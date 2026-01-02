# handball_ai/tests/test_api.py
import os
import pytest
import sys
import os

# Add the project root `stats-handball` to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from backend.app import create_app

@pytest.fixture
def app():
    app = create_app({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
    })
    yield app

@pytest.fixture
def client(app):
    return app.test_client()

def test_index_route(client):
    """Test the index route serves HTML."""
    response = client.get('/')
    assert response.status_code == 200
    assert b'Handball AI Analytics Platform' in response.data

def test_upload_route_no_file(client):
    """Test upload route without a file."""
    response = client.post('/api/videos/upload')
    assert response.status_code == 400

# A more complete test would involve mocking the file upload and DB interactions
