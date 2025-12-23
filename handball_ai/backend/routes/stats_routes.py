# handball_ai/backend/routes/stats_routes.py
from flask import Blueprint, jsonify
from ..database.models import Video, Event

stats_bp = Blueprint('stats_routes', __name__)

@stats_bp.route('/<int:video_id>/status', methods=['GET'])
def get_video_status(video_id):
    """Endpoint para consultar el estado de procesamiento de un vídeo."""
    video = Video.query.get(video_id)
    if not video:
        return jsonify({'error': 'Video not found'}), 404

    return jsonify({
        'video_id': video.id,
        'status': video.processing_status
    }), 200

@stats_bp.route('/<int:video_id>', methods=['GET'])
def get_stats_for_video(video_id):
    """Endpoint para obtener las estadísticas y eventos de un vídeo procesado."""
    video = Video.query.get(video_id)
    if not video:
        return jsonify({'error': 'Video not found'}), 404

    if video.processing_status != 'completed':
        return jsonify({
            'message': 'Video analysis is not yet complete.',
            'status': video.processing_status
        }), 202

    # Lógica para formatear y devolver las estadísticas reales (a implementar)
    events = Event.query.filter_by(video_id=video_id).all()

    return jsonify({
        'video_id': video.id,
        'filename': video.filename,
        'processing_status': video.processing_status,
        'events_count': len(events),
        'events': [] # Placeholder for formatted events
    }), 200
