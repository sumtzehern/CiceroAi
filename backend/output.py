from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import asyncio
import threading
from hume_test import main

app = Flask(__name__)
socketio = SocketIO(app)
hume_task_started = False  # Add this to track if the task has started

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    print('Total clients connected:', len(socketio.server.eio.sockets))

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')
    print('Total clients connected:', len(socketio.server.eio.sockets))

def send_message_to_client(message):
    print(message)
    socketio.emit('result', {'result': message})

def start_hume_test():
    global hume_task_started
    if not hume_task_started:
        hume_task_started = True
        asyncio.run(main(send_message_to_client))

if __name__ == '__main__':
    # Start the hume_test.py script in a separate thread
    threading.Thread(target=start_hume_test).start()
    socketio.run(app, debug=True)
