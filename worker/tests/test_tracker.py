import sys
import unittest
from unittest.mock import MagicMock
import numpy as np

# Mock dependencies
sys.modules['ultralytics'] = MagicMock()
sys.modules['cv2'] = MagicMock()

# Now import the module under test
try:
    from worker.ai.tracker import SeguidorIA
except ImportError:
    sys.path.append('.')
    from worker.ai.tracker import SeguidorIA


class TestTracker(unittest.TestCase):
    def test_trackear_partido_tracks_objects(self):
        tracker = SeguidorIA()

        # Mock the YOLO model instance and its track method
        mock_results = MagicMock()

        # Setup mock data: 3 objects.
        # ID 10: Class 0 (Player) -> Should be tracked
        # ID 11: Class 32 (Ball) -> Should be tracked
        # ID 12: Class 1 (Car/Other) -> Should NOT be tracked

        # boxes.xyxy: [[x1, y1, x2, y2], ...]
        mock_results.boxes.xyxy.cpu().numpy.return_value = np.array([
            [10, 10, 20, 20],
            [30, 30, 40, 40],
            [50, 50, 60, 60]
        ])

        # boxes.id: [10, 11, 12]
        mock_results.boxes.id.cpu().numpy.return_value = np.array([10, 11, 12])

        # boxes.cls: [0, 32, 1]
        mock_results.boxes.cls.cpu().numpy.return_value = np.array([0, 32, 1])

        # The track method returns a list of results (one per frame)
        tracker.modelo.track.return_value = [mock_results]

        # Dummy frames generator (list of 1 frame)
        frames = [np.zeros((100, 100, 3), dtype=np.uint8)]

        result = tracker.trackear_partido(frames)

        if isinstance(result, tuple):
            trayectorias, clases = result

            # Check ID 10 (Player) is tracked
            self.assertIn(10, trayectorias)
            self.assertEqual(clases[10], 0)

            # Check ID 11 (Ball) is tracked
            self.assertIn(11, trayectorias)
            self.assertEqual(clases[11], 32)

            # Check ID 12 (Other) is NOT tracked
            self.assertNotIn(12, trayectorias)
            self.assertNotIn(12, clases)

        else:
            self.fail(
                "trackear_partido should return a tuple (trayectorias, clases)"
            )


if __name__ == '__main__':
    unittest.main()
