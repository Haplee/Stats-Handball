from ultralytics import YOLO


class DetectorIA:
    def __init__(self, modelo_path='yolov8n.pt'):
        """
        Inicializa el detector.

        Args:
            modelo_path (str): Ruta al modelo YOLO.
        """
        # Cargamos el modelo YOLOv8
        # (la versión nano es más rápida para procesar)
        self.modelo = YOLO(modelo_path)

    def _procesar_resultados(self, resultados):
        detecciones_frame = []
        for caja in resultados.boxes:
            # Sacamos las coordenadas, confianza y la clase
            # Por ahora usamos el modelo preentrenado de COCO
            # (0 es persona, 32 es balón)
            clase_id = int(caja.cls[0])
            confianza = float(caja.conf[0])

            # Solo nos interesan personas (jugadores) y balones
            if clase_id in [0, 32] and confianza > 0.4:
                coords = caja.xyxy[0].tolist()  # [x1, y1, x2, y2]

                detecciones_frame.append({
                    "caja": coords,
                    "etiqueta": "jugador" if clase_id == 0 else "balon",
                    "confianza": round(confianza, 2)
                })
        return detecciones_frame

    def detectar_partido(self, frames):
        """
        Analiza los frames del partido buscando los objetos
        configurados en clases_interes.
        """
        todo_detecciones = []
        batch_size = 32
        batch_frames = []

        # Procesamos por batches para optimizar
        for imagen in frames:
            batch_frames.append(imagen)

            if len(batch_frames) == batch_size:
                resultados_batch = self.modelo(
                    batch_frames, stream=False, verbose=False
                )
                for resultados in resultados_batch:
                    todo_detecciones.append(
                        self._procesar_resultados(resultados)
                    )
                batch_frames = []

        # Procesar frames restantes
        if batch_frames:
            resultados_batch = self.modelo(
                batch_frames, stream=False, verbose=False
            )
            for resultados in resultados_batch:
                todo_detecciones.append(self._procesar_resultados(resultados))

        print(
            f"Análisis IA terminado. "
            f"Se han procesado {len(todo_detecciones)} frames."
        )
        return todo_detecciones
