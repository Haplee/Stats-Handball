from datetime import datetime
from app.extensions import db

class Team(db.Model):
    __tablename__ = 'equipos'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, name='nombre')
    category = db.Column(db.String(50), name='categoria')
    coach_name = db.Column(db.String(100), name='nombre_entrenador')
    logo_path = db.Column(db.String(255), name='ruta_logo') # Ruta a la imagen subida
    
    # Estadísticas guardadas como JSON (ej: {"victorias": 10, "derrotas": 2})
    stats = db.Column(db.JSON, default={}, name='estadisticas')
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow, name='creado_el')
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, name='actualizado_el')

    # Relación Clave: Un equipo tiene muchos jugadores
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
