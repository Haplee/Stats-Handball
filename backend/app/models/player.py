from datetime import datetime
from app.extensions import db

class Player(db.Model):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    number = db.Column(db.Integer)
    position = db.Column(db.String(50))
    
    # Physical attributes
    height = db.Column(db.Float) # e.g., 185 (cm)
    weight = db.Column(db.Float) # e.g., 85.5 (kg)
    date_of_birth = db.Column(db.Date)
    
    photo_path = db.Column(db.String(255))
    
    # Relationship
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), nullable=True)

    # Detailed Stats (Goals, Assists, 7m, etc.)
    stats = db.Column(db.JSON, default={
        "goals": 0, "assists": 0, "shots": 0, "minutes_played": 0
    })

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'number': self.number,
            'position': self.position,
            'height': self.height,
            'weight': self.weight,
            'date_of_birth': self.date_of_birth.isoformat() if self.date_of_birth else None,
            'photo_path': self.photo_path,
            'team_id': self.team_id,
            'stats': self.stats
        }
