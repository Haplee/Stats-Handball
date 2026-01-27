from datetime import datetime
from app.extensions import db

class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50))
    coach_name = db.Column(db.String(100))
    logo_path = db.Column(db.String(255)) # Path to uploaded image
    
    # Stats stored as JSON (e.g., {"wins": 10, "losses": 2})
    stats = db.Column(db.JSON, default={})
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Key relationship: A team has many players
    players = db.relationship('Player', backref='team', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'coach_name': self.coach_name,
            'logo_path': self.logo_path,
            'stats': self.stats,
            'player_count': len(self.players) if self.players else 0,
            'created_at': self.created_at.isoformat()
        }
