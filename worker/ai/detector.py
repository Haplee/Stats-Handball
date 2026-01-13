import cv2
from ultralytics import YOLO

class DetectorIA:
    def __init__(self, modelo_path='yolov8n.pt'):
        # Cargamos el modelo YOLOv8 (la versión nano es más rápida para procesar)
        self.modelo = YOLO(modelo_path)

    def detectar_partido(self, frames):
        """
        Analiza los frames del partido buscando jugadores, balón y árbitros.
        """
        todo_detecciones = []
        
        # Procesamos frame a frame (se podría optimizar procesando por batches)
        for num_frame, imagen in enumerate(frames):
            # Le pasamos el frame al modelo de ultralytics
            resultados = self.modelo(imagen, stream=False, verbose=False)[0]
            
            detecciones_frame = []
            for caja in resultados.boxes:
                # Sacamos las coordenadas, confianza y la clase
                # Por ahora usamos el modelo preentrenado de COCO (0 es persona, 32 es balón)
                clase_id = int(caja.cls[0])
                confianza = float(caja.conf[0])
                
                # Solo nos interesan personas (jugadores) y balones
                if clase_id in [0, 32] and confianza > 0.4:
                    coords = caja.xyxy[0].tolist() # [x1, y1, x2, y2]
                    
                    detecciones_frame.append({
                        "caja": coords,
                        "etiqueta": "jugador" if clase_id == 0 else "balon",
                        "confianza": round(confianza, 2)
                    })
            
            todo_detecciones.append(detecciones_frame)
            
        print(f"Análisis IA terminado. Se han procesado {len(todo_detecciones)} frames.")
        return todo_detecciones
