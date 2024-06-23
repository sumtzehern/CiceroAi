import asyncio
import cv2
import base64
from hume import HumeStreamClient, StreamSocket
from hume.models.config import FaceConfig
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
API_KEY = os.getenv("HUME_API_KEY")
API_URL = 'wss://api.hume.ai/v0/stream/models'

# Function to encode video frame to base64
def encode_frame(frame):
    _, buffer = cv2.imencode('.jpg', frame)
    img_bytes = buffer.tobytes()
    img_base64 = base64.b64encode(img_bytes).decode('utf-8')
    return img_base64

async def main():
    client = HumeStreamClient(API_KEY)
    config = FaceConfig(identify_faces=True)

    async with client.connect([config]) as socket:
        # Initialize the webcam
        cap = cv2.VideoCapture(0)
        cap.set(3, 640)
        cap.set(4, 480)

        if not cap.isOpened():
            print("Error: Camera could not be opened.")
            return

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                print("Failed to grab frame")
                break

            # Encode the frame
            encoded_frame = encode_frame(frame)

            # Send the encoded frame to the WebSocket server
            result = await socket.send_data(encoded_frame, {"models": {"face": {}}})

            # Process and display the result
            if 'face' in result:
                for prediction in result['face']['predictions']:
                    for emotion in prediction['emotions']:
                        print(f"{emotion['name']}: {emotion['score']}")

            # Display the frame with annotations (if any)
            cv2.imshow('Facial Expression Analysis', frame)
            
            if cv2.waitKey(5) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    asyncio.run(main())
