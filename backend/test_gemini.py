from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

models = [
    "gemini-2.0-flash",
    "gemini-flash-latest",
    "gemini-2.5-flash",
    "gemini-2.5-pro",
]

for model in models:
    try:
        response = client.models.generate_content(
            model=model,
            contents="Say hello"
        )
        print(f"✅ {model} works")
        print(response.text)
    except Exception as e:
        print(f"❌ {model} failed")
        print(e)
        print("-" * 50)