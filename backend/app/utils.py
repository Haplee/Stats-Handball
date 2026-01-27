from functools import wraps
from flask import session, jsonify

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({"error": "No estás autenticado"}), 401
        return f(*args, **kwargs)
    return decorated_function

def allowed_file(filename, extensions={'png', 'jpg', 'jpeg', 'gif'}):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in extensions
