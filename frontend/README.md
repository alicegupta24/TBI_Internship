# StayInsight

StayInsight is an AI-powered hotel review analytics platform that helps hospitality businesses analyze guest feedback, identify service trends, and improve customer satisfaction through intelligent insights and interactive dashboards.

---

## Features

- AI-powered review summarization using Google Gemini AI
- User registration and JWT-based authentication
- Role-based access (User & Admin)
- Interactive admin dashboard
- Rating distribution bar chart
- Review sentiment pie chart
- Search and rating filter for reviews
- Delete reviews (Admin)
- Responsive UI with Dark/Light mode
- Secure MongoDB Atlas database integration

---

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Recharts
- Lucide React

### Backend
- FastAPI
- Python
- JWT Authentication
- Google Gemini AI API

### Database
- MongoDB Atlas

### Deployment
- Frontend: Vercel
- Backend: Render

---

## Live Deployment

### Frontend
https://tbi-internship-xbxv-eight.vercel.app

### Backend
https://stayinsight-backend.onrender.com

---

## Project Structure

```
frontend/
backend/
postman/
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/alicegupta24/TBI_Internship.git
cd TBI_Internship
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

Example:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
```

---

## Known Limitations

- Render free tier spins down after periods of inactivity.
- The first backend request may take 30–60 seconds while the service wakes up.
- Demo data is limited to sample hotel reviews.

---

## Author

Alice Gupta

Graphic Era (Deemed to be University)

TBI Internship Project – StayInsight