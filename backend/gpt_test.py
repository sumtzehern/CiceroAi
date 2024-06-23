import os
import openai
import json

from dotenv import load_dotenv

load_dotenv()

def chat_with_gpt(prompt):
    client = openai.OpenAI(api_key = os.environ.get("OPENAI_API_KEY"),
)
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": '''
             Please provide feedback to the user based on the given JSON file. The JSON file will be a multi-line input 
             that contains messages between an AI debator and a user. Please print out the top 3 emotions (in a
             dropdown table format) as well as their percentages. Based on the top three, please give constructive 
             criticism and critique on the debate skill of the user as well (2 sentences max). Act like you are talking 
             to user as well. \n\n''' + prompt}
            # {"role": "user", "content": f"Describe the interaction with {npc} in one or two sentences"}
        ]
    )
    print(response.choices[0].message.content)


if __name__ == "__main__":
    while True:
        file_path = input("Enter the path to the JSON file (or type 'quit' to exit): ")
        if file_path.lower() in ["quit", "exit", "bye"]:
            break
        
        try:
            with open(file_path, 'r') as file:
                json_content = file.read()
                response = chat_with_gpt(json_content)
                print(f"Bot: {response}")
        except FileNotFoundError:
            print(f"Error: The file {file_path} does not exist.")
        except json.JSONDecodeError:
            print("Error: The file is not a valid JSON.")
        except Exception as e:
            print(f"An error occurred: {e}")

    # backend/output/output_20240622_230700.json  -->   JSON filepath

    # while True:
    #     user_input = input("You: ")
    #     if user_input.lower() in ["quit", "exit", "bye"]:
    #         break

    #     response = chat_with_gpt(user_input)
    #     print(f"Bot: {response}")