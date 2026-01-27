import sys
import unittest
from unittest.mock import MagicMock, patch

# Mock dependencies safely
from unittest.mock import MagicMock
import sys

def mock_if_missing(name):
    if name not in sys.modules:
        try:
            __import__(name)
        except ImportError:
            sys.modules[name] = MagicMock()

for m in ['cv2', 'ultralytics']:
    mock_if_missing(m)

# Import the module under test
try:
    from worker.ai.detector import DetectorIA
except ImportError:
    sys.path.append('.')
    from worker.ai.detector import DetectorIA




class TestDetectorIA(unittest.TestCase):

    @patch('worker.ai.detector.YOLO')
    def test_default_init(self, mock_yolo_cls):
        """Test initialization with default values (COCO)"""
        # We don't check for self.clases_interes anymore as it's not stored
        _ = DetectorIA()
        mock_yolo_cls.assert_called_with('yolov8n.pt')

    @patch('worker.ai.detector.YOLO')
    def test_detectar_partido_default(self, mock_yolo_cls):
        """Test detection using default configuration"""
        # Setup the mock model instance
        mock_model_instance = mock_yolo_cls.return_value

        detector = DetectorIA()

        # Configure the mock result
        mock_result = MagicMock()
        mock_box_person = MagicMock()
        mock_box_person.cls = [0.0]
        mock_box_person.conf = [0.9]
        mock_box_person.xyxy = MagicMock()
        mock_box_person.xyxy.__getitem__.return_value.tolist.return_value = [
            10, 10, 50, 50
        ]

        mock_box_ball = MagicMock()
        mock_box_ball.cls = [32.0]
        mock_box_ball.conf = [0.8]
        mock_box_ball.xyxy = MagicMock()
        mock_box_ball.xyxy.__getitem__.return_value.tolist.return_value = [
            100, 100, 110, 110
        ]

        mock_box_other = MagicMock()
        mock_box_other.cls = [99.0]  # Not in interest
        mock_box_other.conf = [0.9]

        mock_result.boxes = [mock_box_person, mock_box_ball, mock_box_other]
        mock_model_instance.return_value = [mock_result]

        frames = ["frame1"]  # Dummy frame
        detections = detector.detectar_partido(frames)

        self.assertEqual(len(detections), 1)  # 1 frame
        frame_detections = detections[0]
        self.assertEqual(len(frame_detections), 2)
        # Person and Ball, 'other' ignored

        # Verify labels
        labels = {d['etiqueta'] for d in frame_detections}
        self.assertEqual(labels, {"jugador", "balon"})


if __name__ == '__main__':
    unittest.main()
