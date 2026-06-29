from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import reviews_collection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "StayInsight Backend Running"}

# 1 GET all reviews
@app.get("/api/reviews")
def get_reviews():
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
def add_review(review: dict):
    reviews_collection.insert_one(review)
    return {"message": "Review added"}

# 4 PUT update review
@app.put("/api/reviews/{review_id}")
def update_review(review_id: int, updated_review: dict):
    result = reviews_collection.update_one(
        {"id": review_id},
        {"$set": updated_review}
    )
    if result.modified_count > 0:
        return {"message": "Review updated"}
    raise HTTPException(status_code=404, detail="Review not found")

# 5 DELETE review
@app.delete("/api/reviews/{review_id}")
def delete_review(review_id: int):
    result = reviews_collection.delete_one({"id": review_id})
    if result.deleted_count > 0:
        return {"message": "Review deleted"}
    raise HTTPException(status_code=404, detail="Review not found")

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