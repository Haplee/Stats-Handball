from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
# Placeholder for a future task import
# from app.tasks import process_video_task

api_bp = Blueprint('api', __name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'mp4', 'mov', 'avi'}

@api_bp.route('/upload', methods=['POST'])
def upload_video():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Here you would create a DB record for the video
        # video = Video(filename=filename, status='uploaded')
        # db.session.add(video)
        # db.session.commit()

        # Then, you would trigger the Celery task
        # process_video_task.delay(video.id)

        return jsonify({
            "message": "File uploaded successfully. Processing has started.",
            "filename": filename
            # "video_id": video.id
        }), 202
    else:
        return jsonify({"error": "File type not allowed"}), 400

@api_bp.route('/videos', methods=['GET'])
def get_videos():
    # Placeholder: In a real app, you would query the database
    # videos = Video.query.all()
    # return jsonify([video.to_dict() for video in videos])
    videos_list = [
        {"id": 1, "filename": "game1.mp4", "status": "completed"},
        {"id": 2, "filename": "training_session.mov", "status": "processing"}
    ]
    return jsonify(videos_list), 200

@api_bp.route('/videos/<int:video_id>', methods=['GET'])
def get_video_status(video_id):
    # Placeholder: Query the database for a specific video
    # video = Video.query.get_or_404(video_id)
    # return jsonify(video.to_dict())
    mock_video = {
        "id": video_id,
        "filename": f"game_{video_id}.mp4",
        "status": "processing",
        "results": None
    }
    return jsonify(mock_video), 200
