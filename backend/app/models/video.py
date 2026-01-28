from ..extensions import db
import datetime


class Video(db.Model):
    # Nombre de la tabla en la base de datos
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)

    # Datos del archivo físico
    nombre_fichero = db.Column(db.String(255), nullable=True) # Coincide con col 'nombre_fichero'
    ruta_fichero = db.Column(db.String(255), nullable=True)   # Coincide con col 'ruta_fichero'

    # Relación con el usuario propietario
    user_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False, name='usuario_id')

    # Enlace de youtube si el vídeo viene de fuera
    enlace_youtube = db.Column(
        db.String(500), nullable=True, name='url_youtube'
    )

    # Estado del procesamiento (pendiente, procesando, completado, fallido)
    estado = db.Column(
        db.String(50), default='pending', nullable=False
    )

    # Progreso de 0 a 100
    progreso = db.Column(db.Integer, default=0)

    # Aquí es donde guardamos todo el chorreo de datos de la IA
    # (jugadores, velocidades, etc)
    resultados = db.Column(db.JSON, nullable=True)

    # Fechas para tenerlo todo controlado
    creado_el = db.Column(
        db.DateTime, default=datetime.datetime.utcnow
    )
    actualizado_el = db.Column(
        db.DateTime, default=datetime.datetime.utcnow,
        onupdate=datetime.datetime.utcnow
    )

    def a_diccionario(self, include_results=True):
        """
        Convierte el objeto a un formato que el frontend entienda bien.
        """
        data = {
            'id': self.id,
            'filename': self.nombre_fichero,
            'status': self.estado,
            'progress': self.progreso,
            'created_at': self.creado_el.isoformat(),
            'updated_at': self.actualizado_el.isoformat()
        }
        if include_results:
            data['results'] = self.resultados
        return data

    def __repr__(self):
        return f'<Partido {self.nombre_fichero}>'
