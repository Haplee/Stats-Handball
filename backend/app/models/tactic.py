from datetime import datetime
from app.extensions import db

class Tactic(db.Model):
    __tablename__ = 'tactics'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    
    # Can store the raw canvas JSON fabric.js data or just an image path
    # Storing both is useful: JSON for editing, Image for preview
    canvas_data = db.Column(db.JSON) 
    image_path = db.Column(db.String(255))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image_path': self.image_path,
            'created_at': self.created_at.isoformat()
        }
