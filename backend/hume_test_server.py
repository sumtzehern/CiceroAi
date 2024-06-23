import cv2
import socket
import pickle
import numpy as np

# Define server IP and port
server_ip = '127.0.0.1'
server_port = 6666

# Create socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

# Bind the socket to the address and port
server_socket.bind((server_ip, server_port))

# Listen for incoming connections
server_socket.listen(5)
print(f"Server listening on {server_ip}:{server_port}")

# Accept a connection
conn, addr = server_socket.accept()
print(f"Connected by {addr}")

while True:
    try:
        data = b""
        while True:
            packet = conn.recv(4096)
            if not packet:
                break
            data += packet

            if len(packet) < 4096:
                break

        if not data:
            break

        frame = pickle.loads(data)
        img = cv2.imdecode(frame, cv2.IMREAD_COLOR)
        cv2.imshow('Img Server', img)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    except Exception as e:
        print(f"Error: {e}")
        break

# Release resources
cv2.destroyAllWindows()
conn.close()
server_socket.close()
