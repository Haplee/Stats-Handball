from datetime import datetime
from app.extensions import db

class Tactic(db.Model):
    __tablename__ = 'tacticas'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, name='nombre')
    description = db.Column(db.Text, name='descripcion')
    
    # Puede guardar los datos JSON raw de fabric.js o solo el path de imagen
    # Guardar ambos es util: JSON para editar, Imagen para previsualizar
    canvas_data = db.Column(db.JSON, name='datos_canvas') 
    image_path = db.Column(db.String(255), name='ruta_imagen')
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow, name='creado_el')
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, name='actualizado_el')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image_path': self.image_path,
            'created_at': self.created_at.isoformat()
        }
