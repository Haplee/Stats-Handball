import json
import pytest
from app.models.user import User

def test_privilege_escalation(client, app):
    """
    Test that a normal user can register as admin by supplying 'role': 'admin'.
    This test currently PASSES (meaning the vulnerability exists).
    After the fix, this test should FAIL to create an admin, or the user should be created as 'user'.
    """
    with app.app_context():
        # Clean up if exists
        u = User.query.filter_by(username='hacker').first()
        if u:
            from app.extensions import db
            db.session.delete(u)
            db.session.commit()

    payload = {
        "username": "hacker",
        "email": "hacker@example.com",
        "password": "password123",
        "role": "admin"  # Attempt to escalate privilege
    }

    response = client.post('/api/auth/register',
                           data=json.dumps(payload),
                           content_type='application/json')

    assert response.status_code == 201

    with app.app_context():
        user = User.query.filter_by(username='hacker').first()
        assert user is not None
        # Verify the fix: the user should be created with role 'user', ignoring the request
        assert user.role == 'user'
