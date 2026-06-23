from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

reviews = [
    {"id": 1, "guest": "Alice", "review": "Great stay", "rating": 5},
    {"id": 2, "guest": "Aseem", "review": "Nice food", "rating": 4}
]

@app.get("/")
def home():
    return {"message": "StayInsight Backend Running"}

# 1 GET all reviews
@app.get("/api/reviews")
def get_reviews():
    return reviews

# 2 GET single review
@app.get("/api/reviews/{review_id}")
def get_review(review_id: int):
    for review in reviews:
        if review["id"] == review_id:
            return review
    raise HTTPException(status_code=404, detail="Review not found")

# 3 POST new review
@app.post("/api/reviews")
def add_review(review: dict):
    reviews.append(review)
    return {"message": "Review added"}

# 4 PUT update review
@app.put("/api/reviews/{review_id}")
def update_review(review_id: int, updated_review: dict):
    for i in range(len(reviews)):
        if reviews[i]["id"] == review_id:
            reviews[i] = updated_review
            return {"message": "Review updated"}
    raise HTTPException(status_code=404, detail="Review not found")

# 5 DELETE review
@app.delete("/api/reviews/{review_id}")
def delete_review(review_id: int):
    for i in range(len(reviews)):
        if reviews[i]["id"] == review_id:
            reviews.pop(i)
            return {"message": "Review deleted"}
    raise HTTPException(status_code=404, detail="Review not found")

# 6 SEARCH review
@app.get("/api/search")
def search_reviews(q: str):
    result = [r for r in reviews if q.lower() in r["review"].lower()]
    return result