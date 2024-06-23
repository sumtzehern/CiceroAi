import json
import os

class Message:
    def __init__(self, role, content, models=None, time=None, message_id=None, from_text=None):
        self.role = role
        self.content = content
        self.models = models if models is not None else {}
        self.time = time
        self.message_id = message_id
        self.from_text = from_text

    def __repr__(self):
        return f"Message(role={self.role}, content={self.content}, models={self.models}, time={self.time}, message_id={self.message_id}, from_text={self.from_text})"

class Chat:
    def __init__(self, chat_group_id, chat_id):
        self.chat_group_id = chat_group_id
        self.chat_id = chat_id
        self.messages = []

    def add_message(self, message):
        self.messages.append(message)

    def __repr__(self):
        return f"Chat(chat_group_id={self.chat_group_id}, chat_id={self.chat_id}, messages={self.messages})"

def load_chat_from_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    
    chat_group_id = None
    chat_id = None
    chat = None

    for item in data:
        if item["type"] == "chat_metadata":
            chat_group_id = item["chat_group_id"]
            chat_id = item["chat_id"]
            chat = Chat(chat_group_id, chat_id)
        elif item["type"] in ["user_message", "assistant_message"]:
            message = Message(
                role=item["message"]["role"],
                content=item["message"]["content"],
                models=item["message"].get("models"),
                time=item["message"].get("time"),
                message_id=item.get("id"),
                from_text=item.get("from_text")
            )
            if chat:
                chat.add_message(message)

    return chat

if __name__ == "__main__":
    file_name = "/Users/tiago/Desktop/Career/githubRepos/personalProjects/engageEye-next-/backend/output/output_20240622_230700.json"  # Replace with your actual file name
    chat = load_chat_from_file(file_name)
    print(chat)
