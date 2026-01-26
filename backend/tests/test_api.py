import io

def login(client, username, password):
    return client.post('/api/auth/login', json={
        'username': username,
        'password': password
    })

def create_user(client, username, email, password):
    return client.post('/api/auth/register', json={
        'username': username,
        'email': email,
        'password': password
    })

from unittest.mock import patch

def test_upload_video_flow(client):
    # Setup user and login
    create_user(client, 'video_user', 'video@test.com', 'pass')
    login(client, 'video_user', 'pass')

    # Upload file
    data = {
        'file': (io.BytesIO(b"dummy video content"), 'test_match.mp4')
    }
    
    with patch('celery.app.base.Celery.send_task') as mock_task:
        resp = client.post('/api/upload', data=data, content_type='multipart/form-data')
        assert resp.status_code == 202
        assert mock_task.called
        video_id = resp.get_json()['video_id']

    # List videos
    resp = client.get('/api/videos')
    assert resp.status_code == 200
    videos = resp.get_json()
    assert len(videos) == 1
    assert videos[0]['id'] == video_id

    # Get single video
    resp = client.get(f'/api/videos/{video_id}')
    assert resp.status_code == 200
    assert resp.get_json()['filename'] == 'test_match.mp4'

def test_delete_video(client):
    # Setup
    create_user(client, 'del_user', 'del@test.com', 'pass')
    login(client, 'del_user', 'pass')

    # Upload
    data = {'file': (io.BytesIO(b"content"), 'to_delete.mp4')}
    with patch('celery.app.base.Celery.send_task'):
        resp = client.post('/api/upload', data=data, content_type='multipart/form-data')
        video_id = resp.get_json()['video_id']

    # Delete
    resp = client.delete(f'/api/videos/{video_id}')
    assert resp.status_code == 200

    # Verify gone
    resp = client.get(f'/api/videos/{video_id}')
    assert resp.status_code == 404

def test_privacy_access(client):
    # User A uploads
    create_user(client, 'user_a', 'a@test.com', 'pass')
    login(client, 'user_a', 'pass')
    data = {'file': (io.BytesIO(b"content"), 'secret.mp4')}
    with patch('celery.app.base.Celery.send_task'):
        resp = client.post('/api/upload', data=data, content_type='multipart/form-data')
        video_id_a = resp.get_json()['video_id']
    client.post('/api/auth/logout')

    # User B tries to access
    create_user(client, 'user_b', 'b@test.com', 'pass')
    login(client, 'user_b', 'pass')

    # Try list (should be empty for B)
    resp = client.get('/api/videos')
    assert len(resp.get_json()) == 0

    # Try access specific video (should be forbidden)
    resp = client.get(f'/api/videos/{video_id_a}')
    assert resp.status_code == 403

    # Try delete (should be forbidden)
    resp = client.delete(f'/api/videos/{video_id_a}')
    assert resp.status_code == 403
