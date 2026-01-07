import cv2

def load_video(video_path):
    """
    Loads a video from the given path and extracts its frames.

    Args:
        video_path (str): The full path to the video file.

    Returns:
        list: A list of frames (as numpy arrays) from the video.
              Returns an empty list if the video cannot be opened.
    """
    frames = []
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print(f"Error: Could not open video file at {video_path}")
        return frames

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frames.append(frame)

    cap.release()
    print(f"Loaded {len(frames)} frames from {video_path}")
    return frames
