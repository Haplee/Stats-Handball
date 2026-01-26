import json

def test_register_login_logout(client):
    # 1. Register
    resp = client.post('/api/auth/register', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'securepassword'
    })
    assert resp.status_code == 201
    
    # 2. Login
    resp = client.post('/api/auth/login', json={
        'username': 'testuser',
        'password': 'securepassword'
    })
    assert resp.status_code == 200
    data = resp.get_json()
    assert data['user']['username'] == 'testuser'
    
    # 3. Check Auth
    resp = client.get('/api/auth/check')
    assert resp.status_code == 200
    assert resp.get_json()['authenticated'] is True

    # 4. Logout
    resp = client.post('/api/auth/logout')
    assert resp.status_code == 200

    # 5. Check Auth again (should be false)
    resp = client.get('/api/auth/check')
    assert resp.get_json()['authenticated'] is False

def test_login_invalid_credentials(client):
    client.post('/api/auth/register', json={
        'username': 'user2',
        'email': 'user2@example.com',
        'password': 'password'
    })
    
    resp = client.post('/api/auth/login', json={
        'username': 'user2',
        'password': 'wrongpassword'
    })
    assert resp.status_code == 401
