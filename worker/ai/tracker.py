from ultralytics import YOLO
import cv2

class SeguidorIA:
    def __init__(self, modelo_path='yolov8n.pt'):
        # Cargamos el modelo YOLOv8 que ya trae capacidades de tracking
        self.modelo = YOLO(modelo_path)

    def trackear_partido(self, frames):
        """
        Esta función procesa los frames y mantiene la identidad de los jugadores
        usando el algoritmo ByteTrack integrado en YOLOv8.
        """
        trayectorias = {}

        print("Empezando el rastreo de jugadores en el campo...")

        for i, frame in enumerate(frames):
            # Ejecutamos el tracker de YOLOv8 (usamos persist=True para mantener IDs)
            # Conf=0.3 para no perder jugadores y iou=0.5 para el solapamiento
            resultados = self.modelo.track(frame, persist=True, tracker="bytetrack.yaml", verbose=False)[0]
            
            # Revisamos qué ha encontrado la IA en este frame
            if resultados.boxes.id is not None:
                cajas = resultados.boxes.xyxy.cpu().numpy()
                ids = resultados.boxes.id.cpu().numpy().astype(int)
                clases = resultados.boxes.cls.cpu().numpy().astype(int)

                for caja, id_obj, clase in zip(cajas, ids, clases):
                    # Solo nos interesan jugadores (clase 0) por ahora
                    if clase == 0:
                        x1, y1, x2, y2 = caja

                        # Registramos la posición para calcular estadísticas después
                        if id_obj not in trayectorias:
                            trayectorias[id_obj] = []
                        
                        # Guardamos el centro del jugador para el mapa de calor
                        centro_x = (x1 + x2) / 2
                        centro_y = (y1 + y2) / 2
                        trayectorias[id_obj].append((centro_x, centro_y))
            
        print(f"Rastreo completado. Hemos seguido a {len(trayectorias)} entes distintos.")
        return trayectorias
