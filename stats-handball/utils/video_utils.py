# handball_ai/utils/video_utils.py
import cv2

def process_video(video_path, detector, tracker, action_recognizer, stats_engine):
    """
    Main pipeline to process a video file.
    """
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # 1. Detección de objetos
        detections = detector.detect_frame(frame)

        # 2. Seguimiento de objetos
        tracked_objects = tracker.update(frame, detections)

        # 3. Reconocimiento de acciones (placeholder)
        actions = action_recognizer(tracked_objects)

        # 4. Actualización de estadísticas (placeholder)
        stats_engine.update(actions)

        frame_count += 1

    cap.release()
    print(f"Processed {frame_count} frames.")

    # 5. Devolver las estadísticas finales
    return stats_engine.get_stats()
