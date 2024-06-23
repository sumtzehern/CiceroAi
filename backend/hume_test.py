import asyncio
import os
from dotenv import load_dotenv 
from hume_test_helper import print_ascii_art
from hume import HumeVoiceClient, MicrophoneInterface, VoiceSocket
import json
from datetime import datetime

message_counter = 0
messages = []

def on_open():
    print_ascii_art("Say hello to EVI, Hume AI's Empathic Voice Interface!")

def on_message(message):
    global message_counter, messages
    message_counter += 1
    msg_type = message["type"]

    message_box = (
        f"\n{'='*60}\n"
        f"Message {message_counter}\n"
        f"{'-'*60}\n"
    )

    if msg_type in {"user_message", "assistant_message"}:
        role = message["message"]["role"]
        content = message["message"]["content"]
        message_box += (
            f"role: {role}\n"
            f"content: {content}\n"
            f"type: {msg_type}\n"
        )

        if "models" in message and "prosody" in message["models"]:
            scores = message["models"]["prosody"]["scores"]
            num = 10
            top_emotions = get_top_n_emotions(prosody_inferences=scores, number=num)

            message_box += f"{'-'*60}\nTop {num} Emotions:\n"
            for emotion, score in top_emotions:
                message_box += f"{emotion}: {score:.4f}\n"

    elif msg_type != "audio_output":
        for key, value in message.items():
            if key != "data":
                message_box += f"{key}: {value}\n"
    else:
        message_box += (
            f"type: {msg_type}\n"
        )

    message_box += f"{'='*60}\n"
    print(message_box)

    filtered_message = {k: v for k, v in message.items() if k != "data"}
    messages.append(filtered_message)

def get_top_n_emotions(prosody_inferences, number):
    sorted_inferences = sorted(prosody_inferences.items(), key=lambda item: item[1], reverse=True)
    return sorted_inferences[:number]

def on_error(error):
    print(f"Error: {error}")

def on_close():
    print_ascii_art("Thank you for using EVI, Hume AI's Empathic Voice Interface!")
    write_json_output()

def write_json_output():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_dir = "output"
    output_file = f"{output_dir}/output_{timestamp}.json"
    os.makedirs(output_dir, exist_ok=True)
    with open(output_file, "w") as f:
        json.dump(messages, f, indent=4)
    print(f"Output written to {output_file}")

async def user_input_handler(socket: VoiceSocket):
    while True:
        user_input = await asyncio.to_thread(input, "Type a message to send or 'Q' to quit: ")
        if user_input.strip().upper() == "Q":
            print("Closing the connection...")
            await socket.close()
            break
        else:
            await socket.send_text_input(user_input)

async def main() -> None:
    try:
        load_dotenv()

        HUME_API_KEY = os.getenv("HUME_API_KEY")
        HUME_SECRET_KEY = os.getenv("HUME_SECRET_KEY")

        client = HumeVoiceClient(HUME_API_KEY, HUME_SECRET_KEY)

        async with client.connect_with_handlers(
            on_open=on_open,
            on_message=on_message,
            on_error=on_error,
            on_close=on_close,
            enable_audio=True,
        ) as socket:
            microphone_task = asyncio.create_task(MicrophoneInterface.start(socket))
            user_input_task = asyncio.create_task(user_input_handler(socket))
            await asyncio.gather(microphone_task, user_input_task)
    except Exception as e:
        print(f"Exception occurred: {e}")

asyncio.run(main())
