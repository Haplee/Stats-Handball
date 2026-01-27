from flask import Blueprint, request, jsonify, current_app
from ..models.tactic import Tactic
from ..extensions import db
from ..utils import login_required
import os
import base64
from werkzeug.utils import secure_filename

tactics_bp = Blueprint('tactics', __name__)

@tactics_bp.route('/', methods=['GET'])
@login_required
def get_tactics():
    tactics = Tactic.query.all()
    return jsonify([t.to_dict() for t in tactics]), 200

@tactics_bp.route('/', methods=['POST'])
@login_required
def create_tactic():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data"}), 400

    name = data.get('name')
    if not name:
        return jsonify({"error": "Name is required"}), 400

    # Handle Base64 Image if provided (for saving the preview)
    image_path = None
    if data.get('image_base64'):
        try:
            # "data:image/png;base64,iVBOR..."
            header, encoded = data['image_base64'].split(",", 1)
            file_data = base64.b64decode(encoded)
            filename = f"tactic_{name.replace(' ', '_')}_{os.urandom(4).hex()}.png"
            save_dir = os.path.join(current_app.root_path, 'static', 'images', 'tactics')
            os.makedirs(save_dir, exist_ok=True)
            
            with open(os.path.join(save_dir, filename), "wb") as f:
                f.write(file_data)
            
            image_path = f"/static/images/tactics/{filename}"
        except Exception as e:
            print(f"Error saving tactic image: {e}")

    new_tactic = Tactic(
        name=name,
        description=data.get('description'),
        canvas_data=data.get('canvas_data'), # The raw JSON for fabric.js
        image_path=image_path
    )
    
    db.session.add(new_tactic)
    db.session.commit()
    
    return jsonify(new_tactic.to_dict()), 201

@tactics_bp.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_tactic(id):
    tactic = Tactic.query.get_or_404(id)
    db.session.delete(tactic)
    db.session.commit()
    return jsonify({"message": "Tactic deleted"}), 200
