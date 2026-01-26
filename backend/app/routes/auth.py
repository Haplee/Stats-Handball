from flask import Blueprint, request, jsonify, session
from ..models.user import User
from ..extensions import db
import datetime

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/register', methods=['POST'])
def register():
    """Registra un nuevo usuario"""
    data = request.get_json()

    # Validar datos requeridos
    if (not data.get('username') or
            not data.get('email') or
            not data.get('password')):
        return jsonify({"error": "Faltan datos requeridos"}), 400

    # Verificar si el usuario ya existe
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "El nombre de usuario ya existe"}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "El email ya está registrado"}), 400

    # Crear nuevo usuario
    new_user = User(
        username=data['username'],
        email=data['email'],
        full_name=data.get('full_name', ''),
        role=data.get('role', 'user')
    )
    new_user.set_password(data['password'])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "Usuario creado exitosamente",
        "user": new_user.to_dict()
    }), 201


@auth_routes.route('/login', methods=['POST'])
def login():
    """Inicia sesión de un usuario"""
    data = request.get_json()

    if not data.get('username') or not data.get('password'):
        return jsonify({"error": "Usuario y contraseña requeridos"}), 400

    # Buscar usuario
    user = User.query.filter_by(username=data['username']).first()

    if not user or not user.check_password(data['password']):
        return jsonify({"error": "Credenciales inválidas"}), 401

    # Actualizar último login
    user.last_login = datetime.datetime.utcnow()
    db.session.commit()

    # Guardar en sesión
    session['user_id'] = user.id
    session['username'] = user.username
    session['role'] = user.role

    return jsonify({
        "message": "Inicio de sesión exitoso",
        "user": user.to_dict()
    }), 200


@auth_routes.route('/logout', methods=['POST'])
def logout():
    """Cierra la sesión del usuario"""
    session.clear()
    return jsonify({"message": "Sesión cerrada exitosamente"}), 200


@auth_routes.route('/me', methods=['GET'])
def get_current_user():
    """Obtiene información del usuario actual"""
    if 'user_id' not in session:
        return jsonify({"error": "No autenticado"}), 401

    user = User.query.get(session['user_id'])
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify(user.to_dict()), 200


@auth_routes.route('/check', methods=['GET'])
def check_auth():
    """Verifica si el usuario está autenticado"""
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        if user:
            return jsonify({
                "authenticated": True,
                "user": user.to_dict()
            }), 200

    return jsonify({"authenticated": False}), 200
