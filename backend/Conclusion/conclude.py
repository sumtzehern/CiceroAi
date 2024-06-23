import asyncio
import sounddevice as sd
import numpy as np
import websockets
import json
import os
import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")

async def analyze_emotions():
    uri = "wss://api.hume.ai/v0/stream/models"
    async with websockets.connect(uri) as websocket:
        async def send_audio():
            def callback(indata, frames, time, status):
                if status:
                    print(status)
                audio_data = indata.tobytes()
                asyncio.run_coroutine_threadsafe(websocket.send(audio_data), loop)

            with sd.InputStream(callback=callback):
                await asyncio.Future()  # run forever

        send_audio_task = asyncio.create_task(send_audio())
        
        while True:
            message = await websocket.recv()
            response = json.loads(message)
            top_emotions = get_top_emotions(response)
            prompt = generate_prompt(top_emotions)
            gpt_response = chat_with_gpt(prompt)
            print(f"Bot: {gpt_response}")

def get_top_emotions(response):
    if 'language' in response and response['language']['predictions']:
        emotions = response['language']['predictions'][0]['emotions']
        sorted_emotions = sorted(emotions, key=lambda x: x['score'], reverse=True)
        return sorted_emotions[:3]  # Top 3 emotions
    return []

def generate_prompt(emotions):
    emotion_list = ", ".join([f"{e['name']} ({e['score']:.2f})" for e in emotions])
    return f"The top three emotions detected are: {emotion_list}. Provide feedback based on these emotions."

def chat_with_gpt(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Your role is to serve as a debate instructor to the user, offering debate from different facts and engaging in respectful conversation. Avoid giving too technical advice. Carefully analyze the top 3 emotional expressions provided in brackets after the User’s message."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message['content']

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(analyze_emotions())
