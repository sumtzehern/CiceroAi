import sounddevice as sd
import numpy as np
import asyncio
import websockets

async def send_audio():
    uri = "wss://api.hume.ai/v0/stream/models"
    async with websockets.connect(uri) as websocket:
        def callback(indata, frames, time, status):
            if status:
                print(status)
            audio_data = indata.tobytes()
            asyncio.run_coroutine_threadsafe(websocket.send(audio_data), loop)

        with sd.InputStream(callback=callback):
            await asyncio.Future()  # run forever

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(send_audio())
