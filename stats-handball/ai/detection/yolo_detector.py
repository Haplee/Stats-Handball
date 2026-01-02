# handball_ai/ai/detection/yolo_detector.py
from ultralytics import YOLO

class YoloDetector:
    def __init__(self, model_path='yolov8n.pt'):
        self.model = YOLO(model_path)
        self.target_classes = {0: 'person', 32: 'sports ball'}

    def detect_frame(self, frame):
        results = self.model(frame, verbose=False)
        detections = []
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls[0])
                if class_id in self.target_classes:
                    detections.append({
                        'box': [int(coord) for coord in box.xyxy[0]],
                        'confidence': float(box.conf[0]),
                        'class_name': self.target_classes[class_id]
                    })
        return detections
