from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
import json 
from ..models.player import Player
from ..extensions import db
from ..utils import login_required, allowed_file

players_bp = Blueprint('players', __name__)

@players_bp.route('/', methods=['GET'])
@login_required
def get_players():
    # Optional filtering
    team_id = request.args.get('team_id')
    if team_id:
        players = Player.query.filter_by(team_id=team_id).all()
    else:
        players = Player.query.all()
    return jsonify([p.to_dict() for p in players]), 200

@players_bp.route('/', methods=['POST'])
@login_required
def create_player():
    if 'photo' in request.files:
        file = request.files['photo']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            save_dir = os.path.join(current_app.root_path, 'static', 'images', 'players')
            os.makedirs(save_dir, exist_ok=True)
            file.save(os.path.join(save_dir, filename))
            photo_path = f"/static/images/players/{filename}"
        else:
            return jsonify({"error": "Invalid photo file"}), 400
    else:
        photo_path = None

    data = request.form
    
    name = data.get('name')
    if not name:
        return jsonify({"error": "Name is required"}), 400

    # Parse date if provided
    dob = None
    if data.get('date_of_birth'):
        try:
             # Expecting YYYY-MM-DD
             from datetime import datetime
             dob = datetime.strptime(data.get('date_of_birth'), '%Y-%m-%d').date()
        except:
            pass

    new_player = Player(
        name=name,
        number=data.get('number'),
        position=data.get('position'),
        height=data.get('height'),
        weight=data.get('weight'),
        date_of_birth=dob,
        team_id=data.get('team_id'),
        photo_path=photo_path
    )
    
    db.session.add(new_player)
    db.session.commit()
    
    return jsonify(new_player.to_dict()), 201

@players_bp.route('/<int:id>', methods=['PUT'])
@login_required
def update_player(id):
    player = Player.query.get_or_404(id)
    
    if 'photo' in request.files:
        file = request.files['photo']
        if file and allowed_file(file.filename):
            filename = secure_filename(f"player_{id}_{file.filename}")
            save_dir = os.path.join(current_app.root_path, 'static', 'images', 'players')
            os.makedirs(save_dir, exist_ok=True)
            file.save(os.path.join(save_dir, filename))
            player.photo_path = f"/static/images/players/{filename}"

    data = request.form
    if data:
        if 'name' in data: player.name = data['name']
        if 'number' in data: player.number = data['number']
        if 'position' in data: player.position = data['position']
        if 'height' in data: player.height = data['height']
        if 'weight' in data: player.weight = data['weight']
        if 'team_id' in data: player.team_id = data['team_id']
        
        if 'stats' in data:
            try:
                # If sending stats as a JSON string field in FormData
                player.stats = json.loads(data['stats'])
            except:
                pass

    db.session.commit()
    return jsonify(player.to_dict()), 200

@players_bp.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_player(id):
    player = Player.query.get_or_404(id)
    db.session.delete(player)
    db.session.commit()
    return jsonify({"message": "Player deleted"}), 200
