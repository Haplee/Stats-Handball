import sys
import unittest
from unittest.mock import MagicMock, patch

# Mock dependencies globally to avoid import errors if packages are missing
# and to prevent side effects during import.
# We check if they are already mocked or installed to avoid conflicts,
# but for unit tests it's often safer to force mock them if we don't want integration behavior.
# However, patching sys.modules at module level is risky with pytest.
# For this specific test file, we want to ensure we can import DetectorIA.

# We will try to import. If it fails, we mock.
try:
    import cv2
except ImportError:
    sys.modules['cv2'] = MagicMock()

try:
    import ultralytics
except ImportError:
    sys.modules['ultralytics'] = MagicMock()

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
        detector = DetectorIA()
        self.assertEqual(detector.clases_interes, {0: "jugador", 32: "balon"})
        mock_yolo_cls.assert_called_with('yolov8n.pt')

    @patch('worker.ai.detector.YOLO')
    def test_custom_init(self, mock_yolo_cls):
        """Test initialization with custom model and classes"""
        custom_classes = {1: "handball", 2: "player"}
        detector = DetectorIA(modelo_path='custom_model.pt', clases_interes=custom_classes)

        self.assertEqual(detector.clases_interes, custom_classes)
        mock_yolo_cls.assert_called_with('custom_model.pt')

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
        mock_box_person.xyxy.__getitem__.return_value.tolist.return_value = [10, 10, 50, 50]

        mock_box_ball = MagicMock()
        mock_box_ball.cls = [32.0]
        mock_box_ball.conf = [0.8]
        mock_box_ball.xyxy = MagicMock()
        mock_box_ball.xyxy.__getitem__.return_value.tolist.return_value = [100, 100, 110, 110]

        mock_box_other = MagicMock()
        mock_box_other.cls = [99.0] # Not in interest
        mock_box_other.conf = [0.9]

        mock_result.boxes = [mock_box_person, mock_box_ball, mock_box_other]
        mock_model_instance.return_value = [mock_result]

        frames = ["frame1"] # Dummy frame
        detections = detector.detectar_partido(frames)

        self.assertEqual(len(detections), 1) # 1 frame
        frame_detections = detections[0]
        self.assertEqual(len(frame_detections), 2) # Person and Ball, 'other' ignored

        # Verify labels
        labels = {d['etiqueta'] for d in frame_detections}
        self.assertEqual(labels, {"jugador", "balon"})

    @patch('worker.ai.detector.YOLO')
    def test_detectar_partido_custom(self, mock_yolo_cls):
        """Test detection using custom configuration"""
        # Setup the mock model instance
        mock_model_instance = mock_yolo_cls.return_value

        custom_classes = {1: "my_class"}
        detector = DetectorIA(clases_interes=custom_classes)

        # Configure the mock result
        mock_result = MagicMock()

        mock_box_target = MagicMock()
        mock_box_target.cls = [1.0] # Matches custom class
        mock_box_target.conf = [0.9]
        mock_box_target.xyxy = MagicMock()
        mock_box_target.xyxy.__getitem__.return_value.tolist.return_value = [10, 10, 50, 50]

        mock_box_coco_person = MagicMock()
        mock_box_coco_person.cls = [0.0] # Matches COCO person, but should be ignored now
        mock_box_coco_person.conf = [0.9]

        mock_result.boxes = [mock_box_target, mock_box_coco_person]
        mock_model_instance.return_value = [mock_result]

        frames = ["frame1"]
        detections = detector.detectar_partido(frames)

        self.assertEqual(len(detections), 1)
        frame_detections = detections[0]
        self.assertEqual(len(frame_detections), 1)
        self.assertEqual(frame_detections[0]['etiqueta'], "my_class")

if __name__ == '__main__':
    unittest.main()
