from flask import Flask, request, jsonify
from hume_test import main
import time

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    result = perform_some_processing(data['input'])
    return jsonify(result=result)

def perform_some_processing(input_data):
    # Simulate some processing time
    time.sleep(2)
    return f"Processed: {input_data}"

if __name__ == '__main__':
    app.run(debug=True)
