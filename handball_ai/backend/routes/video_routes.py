# handball_ai/backend/routes/video_routes.py
import os
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from ..database.db import db
from ..database.models import Video

video_bp = Blueprint('video_routes', __name__)
ALLOWED_EXTENSIONS = {'mp4', 'mov', 'avi'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@video_bp.route('/upload', methods=['POST'])
def upload_video():
    upload_folder = os.path.join(current_app.instance_path, 'uploads')
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)

    if 'video' not in request.files:
        return jsonify({'error': 'No video file part'}), 400
    file = request.files['video']
    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({'error': 'Invalid or no selected file'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(upload_folder, filename)
    file.save(filepath)

    # El análisis ya no se hace aquí. Se encola para el worker.
    new_video = Video(filename=filename, processing_status='queued')
    db.session.add(new_video)
    db.session.commit()

    return jsonify({
        'message': 'Video successfully uploaded and queued for analysis.',
        'video_id': new_video.id
    }), 202 # 202 Accepted
