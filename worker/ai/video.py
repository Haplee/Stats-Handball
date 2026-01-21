import cv2

def process_video(video_path):
    """
    Opens a video file and returns its properties and a generator to iterate over its frames.

    Args:
        video_path (str): The full path to the video file.

    Returns:
        tuple: A tuple containing video properties (width, height, fps, frame_count)
               and a generator for frames. Returns (None, None) if the video
               cannot be opened.
    """
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print(f"Error: Could not open video file at {video_path}")
        return None, None

    # Get video properties
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    properties = {
        "width": width,
        "height": height,
        "fps": fps,
        "frame_count": frame_count
    }

    def frame_generator():
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            yield frame
        cap.release()
        print(f"Finished processing frames from {video_path}")

    return properties, frame_generator()
