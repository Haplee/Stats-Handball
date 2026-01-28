from datetime import datetime
from app.extensions import db

class Player(db.Model):
    __tablename__ = 'jugadores'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, name='nombre')
    number = db.Column(db.Integer, name='numero')
    position = db.Column(db.String(50), name='posicion')
    
    # Atributos Físicos
    height = db.Column(db.Float, name='altura') # ej: 185 (cm)
    weight = db.Column(db.Float, name='peso') # ej: 85.5 (kg)
    date_of_birth = db.Column(db.Date, name='fecha_nacimiento')
    
    photo_path = db.Column(db.String(255), name='ruta_foto')
    
    # Relación
    team_id = db.Column(db.Integer, db.ForeignKey('equipos.id'), nullable=True, name='equipo_id')

    # Estadísticas Detalladas (Goles, Asistencias, 7m, etc.)
    stats = db.Column(db.JSON, default={
        "goals": 0, "assists": 0, "shots": 0, "minutes_played": 0
    }, name='estadisticas')

    created_at = db.Column(db.DateTime, default=datetime.utcnow, name='creado_el')

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
