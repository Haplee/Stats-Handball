import cv2
from ultralytics import YOLO

class DetectorIA:
    def __init__(self, modelo_path='yolov8n.pt', clases_interes=None):
        """
        Inicializa el detector.

        Args:
            modelo_path (str): Ruta al modelo YOLO (puede ser .pt personalizado).
            clases_interes (dict, optional): Diccionario mapeando ID de clase a etiqueta.
                                             Por defecto usa clases COCO: {0: 'jugador', 32: 'balon'}.
        """
        # Cargamos el modelo YOLOv8 (la versión nano es más rápida para procesar)
        self.modelo = YOLO(modelo_path)

        # Configuración de clases de interés (ID -> Etiqueta)
        if clases_interes is None:
            # Por defecto usamos el modelo preentrenado de COCO (0 es persona, 32 es balón)
            self.clases_interes = {0: "jugador", 32: "balon"}
        else:
            self.clases_interes = clases_interes

    def detectar_partido(self, frames):
        """
        Analiza los frames del partido buscando los objetos configurados en clases_interes.
        """
        todo_detecciones = []
        
        # Procesamos frame a frame (se podría optimizar procesando por batches)
        for num_frame, imagen in enumerate(frames):
            # Le pasamos el frame al modelo de ultralytics
            resultados = self.modelo(imagen, stream=False, verbose=False)[0]
            
            detecciones_frame = []
            for caja in resultados.boxes:
                # Sacamos las coordenadas, confianza y la clase
                clase_id = int(caja.cls[0])
                confianza = float(caja.conf[0])
                
                # Solo nos interesan las clases configuradas y con suficiente confianza
                if clase_id in self.clases_interes and confianza > 0.4:
                    coords = caja.xyxy[0].tolist() # [x1, y1, x2, y2]
                    
                    detecciones_frame.append({
                        "caja": coords,
                        "etiqueta": self.clases_interes[clase_id],
                        "confianza": round(confianza, 2)
                    })
            
            todo_detecciones.append(detecciones_frame)
            
        print(f"Análisis IA terminado. Se han procesado {len(todo_detecciones)} frames.")
        return todo_detecciones
