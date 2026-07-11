from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

try:
    client = MongoClient(
        MONGO_URI,
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=5000
    )

    client.admin.command("ping")
    print("✅ Connected to MongoDB Atlas")

except Exception as e:
    print("❌ MongoDB Connection Failed")
    print(e)

db = client[os.getenv("DB_NAME")]

reviews_collection = db["reviews"]
users_collection = db["users"]