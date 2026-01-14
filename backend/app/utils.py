import os
import datetime
from werkzeug.utils import secure_filename

def formatear_tiempo_balonmano(segundos):
    """
    Convierte segundos totales en formato de cronómetro de balonmano (MM:SS).
    Ejemplo: 125 -> "02:05"
    """
    if not segundos:
        return "00:00"
    minutos = int(segundos // 60)
    segs = int(segundos % 60)
    return f("{minutos:02d}:{segs:02d}")

def generar_nombre_unico(nombre_original):
    """
    Crea un nombre de archivo único añadiendo un timestamp 
    para evitar que un archivo sobrescriba a otro con el mismo nombre.
    """
    nombre_limpio = secure_filename(nombre_original)
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    nombre, extension = os.path.splitext(nombre_limpio)
    return f("{nombre}_{timestamp}{extension}")

def validar_tamano_archivo(archivo, max_mb=500):
    """
    Comprueba que el vídeo no sea demasiado pesado para el servidor.
    Por defecto: 500MB.
    """
    archivo.seek(0, os.SEEK_END)
    tamano = archivo.tell()
    archivo.seek(0)  # Resetear el puntero al inicio
    return tamano <= (max_mb * 1024 * 1024)

def calcular_efectividad(aciertos, totales):
    """
    Calcula el porcentaje de efectividad (goles/paradas).
    """
    if totales == 0:
        return 0.0
    return round((aciertos / totales) * 100, 2)

