import os
import openai

from dotenv import load_dotenv

load_dotenv()

def chat_with_gpt(prompt):
    client = openai.OpenAI(api_key = os.environ.get("OPENAI_API_KEY"),
)
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "I am practicing my debate skills and would like to improve my debate skills. Always play the devil's advocate in comparison to the user" + prompt},
            # {"role": "user", "content": f"Describe the interaction with {npc} in one or two sentences"}
        ]
    )
    print(response.choices[0].message.content)


if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["quit", "exit", "bye"]:
            break

        response = chat_with_gpt(user_input)
        print(f"Bot: {response}")