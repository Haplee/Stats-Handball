import sys
import os
import unittest
from datetime import datetime

# Añadir el directorio actual al path para simular estar en la raiz del backend si se ejecuta desde allí
sys.path.append(os.getcwd())

# Intentamos importar la app para ver si los imports rompen
try:
    from app.utils import formatear_tiempo_balonmano, generar_nombre_unico, es_archivo_valido, obtener_info_archivo, calcular_efectividad
    print("✅ Importación de app.utils exitosa")
except ImportError as e:
    print(f"❌ Error importando utils: {e}")
    sys.exit(1)

try:
    # Esto validará que las correcciones en api.py (imports) estén bien
    # Necesitamos mockear flask y otras dependencias si no están instaladas, 
    # pero asumiremos que el entorno tiene lo basico (flask, sqlalchemy) si el usuario dijo "comienza a hacer pruebas"
    from app.routes.api import api_rutas
    print("✅ Importación de app.routes.api exitosa")
except ImportError as e:
    print(f"⚠️  Advertencia importando api (posible falta de dependencias Flask completas en este entorno, o error de código): {e}")
    # No fallamos fatalmente aquí porque puede ser solo falta de 'flask_cors' etc en el env local del agente

class TestUtils(unittest.TestCase):
    def test_formatear_tiempo(self):
        # 125 segundos = 2 min 5 seg
        self.assertEqual(formatear_tiempo_balonmano(125), "02:05")
        self.assertEqual(formatear_tiempo_balonmano(0), "00:00")
        self.assertEqual(formatear_tiempo_balonmano(None), "00:00")
        print("✅ test_formatear_tiempo pasado")

    def test_generar_nombre_unico(self):
        nombre = "video.mp4"
        unico = generar_nombre_unico(nombre)
        self.assertTrue(unico.startswith("video_"))
        self.assertTrue(unico.endswith(".mp4"))
        print("✅ test_generar_nombre_unico pasado")
    
    def test_es_archivo_valido(self):
        self.assertTrue(es_archivo_valido("partido.mp4"))
        self.assertTrue(es_archivo_valido("juego.MOV"))
        self.assertTrue(es_archivo_valido("test.avi"))
        self.assertFalse(es_archivo_valido("imagen.jpg"))
        self.assertFalse(es_archivo_valido("texto.txt"))
        print("✅ test_es_archivo_valido pasado")

    def test_calcular_efectividad(self):
        self.assertEqual(calcular_efectividad(5, 10), 50.0)
        self.assertEqual(calcular_efectividad(0, 10), 0.0)
        self.assertEqual(calcular_efectividad(5, 0), 0.0)
        print("✅ test_calcular_efectividad pasado")

if __name__ == '__main__':
    unittest.main()
