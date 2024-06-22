import asyncio
import cv2
import base64
from hume import HumeStreamClient, StreamSocket
from hume.models.config import FaceConfig

async def process_frame(socket, frame):
    # Encode frame to JPEG
    _, buffer = cv2.imencode('.jpg', frame)
    frame_bytes = buffer.tobytes()
    
    # Encode the frame bytes to a Base64 string
    frame_base64 = base64.b64encode(frame_bytes).decode('utf-8')
    
    # Send the frame to Hume API and get the result
    result = await socket.send_bytes(frame_base64)
    print(result)  # You can process the result as needed

async def main():
    client = HumeStreamClient("BwYrjprHjI8UFsXLzZOUACSX8XwL81od3V4PCkaXvFigZ084")
    config = FaceConfig(identify_faces=True)
    
    async with client.connect([config]) as socket:
        # Open a connection to the webcam
        cap = cv2.VideoCapture(0)
        
        if not cap.isOpened():
            print("Error: Could not open webcam.")
            return
        
        while True:
            ret, frame = cap.read()
            if not ret:
                print("Error: Could not read frame.")
                break
            
            # Process the frame
            await process_frame(socket, frame)
            
            # Display the frame (optional)
            cv2.imshow('Live Feed', frame)
            
            # Exit on 'q' key press
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        
        cap.release()
        cv2.destroyAllWindows()

# Run the main function
asyncio.run(main())