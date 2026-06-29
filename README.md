StayInsight – Guest Review Management System
Project Overview

StayInsight is a full-stack guest review management application built during the TBI Internship. It allows users to create, read, update, delete, and search guest reviews.

The frontend is built using React + Tailwind CSS, the backend uses FastAPI, and the database is MongoDB Atlas for persistent cloud storage.

Tech Stack
Frontend
React.js
Tailwind CSS
Vite
Backend
FastAPI
Python
Uvicorn
Database
MongoDB Atlas
PyMongo
Why MongoDB?

MongoDB was chosen because:

It is easy to integrate with FastAPI.
It stores JSON-like documents.
It supports flexible schema.
It provides free cloud storage via Atlas.
Database Schema
Reviews Collection
Reviews
│
├── id (Number)
├── guest (String)
├── review (String)
└── rating (Number)

API Endpoints
GET all reviews
GET /api/reviews
GET single review
GET /api/reviews/{review_id}
POST create review
POST /api/reviews
PUT update review
PUT /api/reviews/{review_id}
DELETE review
DELETE /api/reviews/{review_id}
SEARCH reviews
GET /api/search?q=keyword
Database Setup
Clone repository
git clone https://github.com/alicegupta24/TBI_Internship.git
Backend setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
Create .env
MONGO_URI=your_mongodb_connection_string
DB_NAME=stayinsight
Run backend
uvicorn main:app --reload
Run frontend
cd frontend
npm install
npm run dev
Week 5 Progress
Integrated MongoDB Atlas database
Migrated in-memory data to persistent cloud database
Implemented full CRUD operations
Connected frontend with backend API
Verified database persistence
