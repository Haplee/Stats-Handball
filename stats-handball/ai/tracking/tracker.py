# handball_ai/ai/tracking/tracker.py
from scipy.spatial import distance as dist
from collections import OrderedDict
import numpy as np

class CentroidTracker:
    def __init__(self, max_disappeared=50):
        self.next_object_id = 0
        self.objects = OrderedDict()
        self.disappeared = OrderedDict()
        self.max_disappeared = max_disappeared

    def register(self, centroid):
        self.objects[self.next_object_id] = centroid
        self.disappeared[self.next_object_id] = 0
        self.next_object_id += 1

    def deregister(self, object_id):
        del self.objects[object_id]
        del self.disappeared[object_id]

    def update(self, rects):
        if len(rects) == 0:
            for object_id in list(self.disappeared.keys()):
                self.disappeared[object_id] += 1
                if self.disappeared[object_id] > self.max_disappeared:
                    self.deregister(object_id)
            return self.objects

        input_centroids = np.zeros((len(rects), 2), dtype="int")
        for (i, (startX, startY, endX, endY)) in enumerate(rects):
            cX = int((startX + endX) / 2.0)
            cY = int((startY + endY) / 2.0)
            input_centroids[i] = (cX, cY)

        if len(self.objects) == 0:
            for i in range(len(input_centroids)):
                self.register(input_centroids[i])
        else:
            object_ids = list(self.objects.keys())
            object_centroids = list(self.objects.values())

            D = dist.cdist(np.array(object_centroids), input_centroids)
            rows = D.min(axis=1).argsort()
            cols = D.argmin(axis=1)[rows]

            used_rows = set()
            used_cols = set()

            for (row, col) in zip(rows, cols):
                if row in used_rows or col in used_cols:
                    continue

                object_id = object_ids[row]
                self.objects[object_id] = input_centroids[col]
                self.disappeared[object_id] = 0
                used_rows.add(row)
                used_cols.add(col)

            unused_rows = set(range(D.shape[0])).difference(used_rows)
            unused_cols = set(range(D.shape[1])).difference(used_cols)

            if D.shape[0] >= D.shape[1]:
                for row in unused_rows:
                    object_id = object_ids[row]
                    self.disappeared[object_id] += 1
                    if self.disappeared[object_id] > self.max_disappeared:
                        self.deregister(object_id)
            else:
                for col in unused_cols:
                    self.register(input_centroids[col])

        return self.objects


class ObjectTracker:
    def __init__(self):
        self.person_tracker = CentroidTracker()
        # El balón no necesita tracking persistente de la misma manera
        self.ball_position = None

    def update(self, frame, detections):
        person_rects = []
        tracked_objects = []

        # Separar detecciones de personas y del balón
        for det in detections:
            if det['class_name'] == 'person':
                person_rects.append(det['box'])
            elif det['class_name'] == 'sports ball':
                self.ball_position = det['box']
                # Añadir el balón a la lista de objetos directamente
                tracked_objects.append({**det, 'track_id': None})

        # Actualizar el tracker de personas
        person_objects = self.person_tracker.update(person_rects)

        # Mapear los centroides trackeados de vuelta a sus bounding boxes
        for (object_id, centroid) in person_objects.items():
            # Encontrar el bounding box original para este centroide
            # Esta es una simplificación. Un tracker real gestionaría esto internamente.
            # Aquí, simplemente asociamos por proximidad.
            min_dist = float('inf')
            best_box = None
            for rect in person_rects:
                cX = int((rect[0] + rect[2]) / 2.0)
                cY = int((rect[1] + rect[3]) / 2.0)
                d = dist.euclidean((cX, cY), centroid)
                if d < min_dist:
                    min_dist = d
                    best_box = rect

            if best_box:
                tracked_objects.append({
                    'box': best_box,
                    'class_name': 'person',
                    'track_id': object_id
                })

        return tracked_objects
