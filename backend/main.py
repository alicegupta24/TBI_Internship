from dotenv import load_dotenv
from google import genai
import os
from fastapi import FastAPI, HTTPException, Request
import time
from google.oauth2 import id_token
from google.auth.transport import requests
from fastapi import Header, Depends
from jose import jwt
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from database import reviews_collection, users_collection
import bcrypt
load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://tbi-internship-xbxv-eight.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
SECRET_KEY = os.getenv("JWT_SECRET")
ADMIN_SECRET = os.getenv("ADMIN_SECRET")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
GOOGLE_CLIENT_ID = "810158019415-rjfg4bnimr82ir1uq47u92u558154puk.apps.googleusercontent.com"
login_attempts = {}
register_attempts = {}

MAX_REQUESTS = 5
WINDOW = 60  # seconds
def check_rate_limit(client_ip, attempts):

    current_time = time.time()

    if client_ip not in attempts:
        attempts[client_ip] = []

    attempts[client_ip] = [
        t for t in attempts[client_ip]
        if current_time - t < WINDOW
    ]

    if len(attempts[client_ip]) >= MAX_REQUESTS:
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please try again after one minute."
        )

    attempts[client_ip].append(current_time)
def verify_token(authorization: str = Header(None)):

    if authorization is None:
        raise HTTPException(status_code=401, detail="Token missing")

    token = authorization.replace("Bearer ", "")

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        return payload

    except:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/")
def home():
    return {"message": "StayInsight Backend Running"}

# 1 GET all reviews
@app.get("/api/reviews")
def get_reviews(user=Depends(verify_token)):
    reviews = list(reviews_collection.find({}, {"_id": 0}))
    return reviews

# 2 GET single review
@app.get("/api/reviews/{review_id}")
def get_review(review_id: int):
    review = reviews_collection.find_one({"id": review_id}, {"_id": 0})
    if review:
        return review
    raise HTTPException(status_code=404, detail="Review not found")

# 3 POST new review
@app.post("/api/reviews")
def add_review(
    review: dict,
    user=Depends(verify_token)
):

    last_review = reviews_collection.find_one(
        sort=[("id", -1)]
    )

    new_id = 1

    if last_review:
        new_id = last_review["id"] + 1

    review["id"] = new_id

    # Logged-in user's email
    review["user_email"] = user["sub"]

    # Date when review was created
    review["created_at"] = datetime.now().strftime("%d %b %Y")

    reviews_collection.insert_one(review)

    return {
        "message": "Review added successfully"
    }
# 4 PUT update review
@app.put("/api/reviews/{review_id}")
def update_review(
    review_id: int,
    updated_review: dict,
    user=Depends(verify_token),
):

    existing_review = reviews_collection.find_one({"id": review_id})

    if not existing_review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    if existing_review["user_email"] != user["sub"]:
        raise HTTPException(
            status_code=403,
            detail="You can edit only your own review."
        )

    reviews_collection.update_one(
        {"id": review_id},
        {
            "$set": {
                "guest": updated_review["guest"],
                "review": updated_review["review"],
                "rating": updated_review["rating"],
            }
        }
    )

    return {
        "message": "Review updated successfully"
    }  
# 5 DELETE review
@app.delete("/api/reviews/{review_id}")
def delete_review(
    review_id: int,
    user=Depends(verify_token),
):
    existing_review = reviews_collection.find_one({"id": review_id})

    if not existing_review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    if existing_review["user_email"] != user["sub"]:
        raise HTTPException(
            status_code=403,
            detail="You can delete only your own review."
        )

    reviews_collection.delete_one({"id": review_id})

    return {
        "message": "Review deleted successfully"
    }
# 6 SEARCH review
@app.get("/api/search")
def search_reviews(q: str):
    result = list(
        reviews_collection.find(
            {"review": {"$regex": q, "$options": "i"}},
            {"_id": 0}
        )
    )
    return result

# 7 REGISTER USER
@app.post("/api/auth/register")
def register(request: Request, user: dict):
    client_ip = request.client.host
    check_rate_limit(client_ip, register_attempts)
    email = user.get("email", "").strip()
    password = user.get("password", "").strip()
    admin_code = user.get("admin_code", "").strip()

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Email is required"
        )

    if "@" not in email or "." not in email:
        raise HTTPException(
            status_code=400,
            detail="Enter a valid email"
        )

    if len(password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 characters"
        )

    existing_user = users_collection.find_one({"email": email})

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    role = "customer"

    if admin_code == ADMIN_SECRET:
        role = "admin"
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    users_collection.insert_one({
        "email": email,
        "password": hashed_password,
        "role": role
    })

    return {
        "message": "User registered successfully"
    }
# 8 LOGIN USER
@app.post("/api/auth/login")
def login(request: Request, user: dict):
    client_ip = request.client.host
    check_rate_limit(client_ip, login_attempts)

    email = user.get("email", "").strip()
    password = user.get("password", "").strip()

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Email is required"
        )

    if "@" not in email or "." not in email:
        raise HTTPException(
            status_code=400,
            detail="Enter a valid email"
        )

    if not password:
        raise HTTPException(
            status_code=400,
            detail="Password is required"
        )

    existing_user = users_collection.find_one({"email": email})

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        existing_user["password"].encode("utf-8")
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    role = existing_user.get("role", "customer")

    token = jwt.encode(
        {
            "sub": email,
            "role": role,
            "exp": expire
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return {
    "access_token": token,
    "token_type": "bearer",
    "role": role
}
#9 google authentication
@app.post("/api/auth/google")
def google_login(data: dict):

    token = data.get("credential")

    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            GOOGLE_CLIENT_ID,
        )

        email = idinfo["email"]
        name = idinfo.get("name", email)

        existing_user = users_collection.find_one({"email": email})

        if not existing_user:
            users_collection.insert_one({
            "email": email,
            "password": "",
            "google_user": True,
            "name": name,
            "role": "customer",
        })

        expire = datetime.utcnow() + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )

        jwt_token = jwt.encode(
            {
                "sub": email,
                "exp": expire,
            },
            SECRET_KEY,
            algorithm=ALGORITHM,
        )

        role = existing_user.get("role", "customer") if existing_user else "customer"

        return {
            "access_token": jwt_token,
            "token_type": "bearer",
            "email": email,
            "name": name,
            "role": role,
        }

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid Google token",
        )
@app.post("/api/ai/summarize")
def summarize_reviews(user=Depends(verify_token)):

    reviews = list(
        reviews_collection.find({}, {"_id": 0})
    )

    if not reviews:
        return {
            "summary": "No reviews available."
        }

    review_text = ""

    for review in reviews:
        review_text += (
            f"Guest: {review.get('guest', '')}\n"
            f"Rating: {review.get('rating', '')}\n"
            f"Review: {review.get('review', '')}\n\n"
        )

    prompt = f"""
You are a hotel review analyst.

Analyze these hotel reviews and provide:

1. Overall customer sentiment
2. Main positive points
3. Main negative points
4. Suggestions for improvement

Hotel Reviews:

{review_text}
"""

    try:
        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt,
        )

        return {
            "summary": response.text
        }

    except Exception as e:
        print("Gemini Error:", repr(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
#10admin stat api
@app.get("/api/admin/stats")
def get_admin_stats():
    total_reviews = reviews_collection.count_documents({})
    total_users = users_collection.count_documents({})

    reviews = list(reviews_collection.find())
    positive_reviews = sum(1 for r in reviews if r["rating"] >= 4)
    neutral_reviews = sum(1 for r in reviews if r["rating"] == 3)
    negative_reviews = sum(1 for r in reviews if r["rating"] <= 2)
    if total_reviews > 0:
        average_rating = round(
            sum(review["rating"] for review in reviews) / total_reviews,
            2
        )
    else:
        average_rating = 0
    return {
    "total_reviews": total_reviews,
    "average_rating": average_rating,
    "registered_users": total_users,
    "positive_reviews": positive_reviews,
    "neutral_reviews": neutral_reviews,
    "negative_reviews": negative_reviews,
}
@app.get("/api/admin/ai-summary")
def get_ai_summary():

    reviews = list(reviews_collection.find())

    if not reviews:
        return {
            "summary": "No reviews available to summarize."
        }

    review_text = "\n".join([
        f"Rating: {r['rating']}/5\nReview: {r['review']}"
        for r in reviews
    ])

    prompt = f"""
    You are an AI Hotel Review Analyst.

    Analyze the reviews and respond in this format only:

    🏨 Overall Sentiment
    (2-3 sentences)

    👍 Strengths
    • Point 1
    • Point 2
    • Point 3

    ⚠ Areas to Improve
    • Point 1
    • Point 2

    💡 Recommendations
    • Point 1
    • Point 2

    Do NOT use Markdown.
    Do NOT use ** or *.
    Keep the response under 120 words.

    Reviews:

    {review_text}
    """

    try:
        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt,
        )

        return {
            "summary": response.text
        }

    except Exception as e:
        print("Admin Gemini Error:", repr(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
@app.delete("/api/admin/reviews/{review_id}")
def admin_delete_review(
    review_id: int,
    user=Depends(verify_token)
):
    if user.get("role") != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required."
        )

    review = reviews_collection.find_one({"id": review_id})

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review not found."
        )

    reviews_collection.delete_one({"id": review_id})

    return {
        "message": "Review deleted successfully."
    }
@app.get("/api/admin/reviews")
def get_all_reviews(
    user=Depends(verify_token)
):
    if user.get("role") != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required."
        )

    reviews = list(
        reviews_collection.find({}, {"_id": 0})
    )

    return reviews