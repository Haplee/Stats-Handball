from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
from ..models.team import Team
from ..extensions import db
from ..utils import login_required, allowed_file

teams_bp = Blueprint('teams', __name__)

@teams_bp.route('/', methods=['GET'])
@login_required
def get_teams():
    teams = Team.query.all()
    return jsonify([t.to_dict() for t in teams]), 200

@teams_bp.route('/', methods=['POST'])
@login_required
def create_team():
    # Check if data comes as JSON or FormData (multichunk) depending on if image is included
    # Likely FormData if image is present.
    
    if 'logo' in request.files:
        file = request.files['logo']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            # Save to static/images/teams
            save_dir = os.path.join(current_app.root_path, 'static', 'images', 'teams')
            os.makedirs(save_dir, exist_ok=True)
            file.save(os.path.join(save_dir, filename))
            logo_path = f"/static/images/teams/{filename}"
        else:
            return jsonify({"error": "Invalid logo file"}), 400
    else:
        logo_path = None

    data = request.form if request.form else request.get_json()
    if not data:
        # If only image sent? unlikely.
        pass
        
    name = data.get('name')
    if not name:
        return jsonify({"error": "Name is required"}), 400

    new_team = Team(
        name=name,
        category=data.get('category'),
        coach_name=data.get('coach_name'),
        logo_path=logo_path
    )
    
    db.session.add(new_team)
    db.session.commit()
    
    return jsonify(new_team.to_dict()), 201

@teams_bp.route('/<int:id>', methods=['PUT'])
@login_required
def update_team(id):
    team = Team.query.get_or_404(id)
    
    # Handle Logo Update
    if 'logo' in request.files:
        file = request.files['logo']
        if file and allowed_file(file.filename):
            filename = secure_filename(f"team_{id}_{file.filename}") # Prefix to avoid collision
            save_dir = os.path.join(current_app.root_path, 'static', 'images', 'teams')
            os.makedirs(save_dir, exist_ok=True)
            file.save(os.path.join(save_dir, filename))
            team.logo_path = f"/static/images/teams/{filename}"
    
    data = request.form if request.form else request.get_json()
    
    if data:
        if 'name' in data: team.name = data['name']
        if 'category' in data: team.category = data['category']
        if 'coach_name' in data: team.coach_name = data['coach_name']
        # Stats update could be separate or here
        if 'stats' in data: team.stats = data['stats'] # Expecting JSON string if from form?

    db.session.commit()
    return jsonify(team.to_dict()), 200

@teams_bp.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_team(id):
    team = Team.query.get_or_404(id)
    db.session.delete(team)
    db.session.commit()
    return jsonify({"message": "Team deleted"}), 200
