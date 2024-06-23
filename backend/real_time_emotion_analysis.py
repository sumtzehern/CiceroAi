import cv2
import requests
import json
import base64
from dotenv import load_dotenv
import os

# Load environment variables from a .env file
load_dotenv()

# Retrieve the Hume API key from the environment variables
HUME_API_KEY = os.getenv("HUME_API_KEY")

# Define the Hume API endpoint
HUME_API_ENDPOINT = "https://api.hume.ai/v0/emotions"

# Function to encode the frame to base64
def encode_frame_to_base64(frame):
    _, buffer = cv2.imencode('.jpg', frame)
    encoded_frame = base64.b64encode(buffer).decode('utf-8')
    return encoded_frame

# Function to send frame to Hume API
def send_frame_to_hume(encoded_frame):
    headers = {
        "Authorization": f"Bearer {HUME_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = json.dumps({
        "image": encoded_frame,
        "models": ["emotions"]
    })
    response = requests.post(HUME_API_ENDPOINT, headers=headers, data=payload)
    return response.json()

# Initialize the camera
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open video device")
    exit()

# Set the video frame width and height
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    if not ret:
        print("Failed to capture frame")
        break

    # Encode the frame to base64
    encoded_frame = encode_frame_to_base64(frame)

    # Send frame to Hume API
    try:
        response = send_frame_to_hume(encoded_frame)
        print(response)
    except Exception as e:
        print(f"Error sending frame to Hume API: {e}")

    # Display the resulting frame
    cv2.imshow('Frame', frame)

    # Break the loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything is done, release the capture
cap.release()
cv2.destroyAllWindows()
