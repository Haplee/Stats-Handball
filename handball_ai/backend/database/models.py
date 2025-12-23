# handball_ai/backend/database/models.py
from .db import db
from datetime import datetime
import json

class Video(db.Model):
    __tablename__ = 'videos'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    upload_timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    processing_status = db.Column(db.String(50), nullable=False, default='pending')
    events = db.relationship('Event', back_populates='video', lazy=True, cascade="all, delete-orphan")

class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.Integer, db.ForeignKey('videos.id'), nullable=False)
    frame_number = db.Column(db.Integer, nullable=False)
    timestamp_seconds = db.Column(db.Float, nullable=False)
    event_type = db.Column(db.String(100), nullable=False)
    player_id = db.Column(db.Integer, nullable=True)
    position_x = db.Column(db.Integer, nullable=True)
    position_y = db.Column(db.Integer, nullable=True)
    details_json = db.Column(db.Text, nullable=True)
    video = db.relationship('Video', back_populates='events')
