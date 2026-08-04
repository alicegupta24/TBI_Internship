# StayInsight – AI Review Analytics Platform

StayInsight is an AI-powered hotel review analytics platform developed to help hospitality businesses understand customer feedback more effectively. Instead of manually going through hundreds of guest reviews, the platform uses Artificial Intelligence to summarize customer opinions, identify sentiment, and present valuable insights through interactive dashboards. It enables hotel owners and managers to make informed decisions that improve customer satisfaction and service quality.

---

## 🌐 Live Demo

**Frontend:**  
https://tbi-internship-xbxv-eight.vercel.app

**Backend:**  
https://stayinsight-backend.onrender.com

---

## 🎥 Demo Video

**YouTube (Unlisted):**  
*Add your YouTube demo video link here after recording.*

---

## 📸 Screenshots

### Home Page
![Home Page](./assets/home.png)

### User Dashboard
![Dashboard](./assets/dashboard.png)

### Admin Dashboard
![Admin Dashboard](./assets/admin-dashboard.png)

### AI Review Summary
![AI Summary](./assets/ai-summary.png)

---

## ✨ Features

- Secure user registration and login using JWT Authentication.
- Google Sign-In integration for quick authentication.
- Role-based access for Customers and Administrators.
- Submit, manage, search, and analyze hotel reviews.
- AI-powered review summaries using Google Gemini AI.
- Interactive Rating Distribution and Review Sentiment charts.
- Responsive design for desktop and mobile devices.
- Dark Mode support for improved user experience.
- Admin dashboard for monitoring reviews and analytics.
- Secure MongoDB Atlas database integration.

---

## 🛠 Tech Stack

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
- Google OAuth

### Database
- MongoDB Atlas

### Artificial Intelligence
- Google Gemini AI

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/alicegupta24/TBI_Internship.git
cd TBI_Internship
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file inside the frontend folder.

```env
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

---

### 3. Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Create a `.env` file inside the backend folder.

```env
MONGO_URI=YOUR_MONGODB_URI
DB_NAME=stayinsight
JWT_SECRET=YOUR_SECRET_KEY
ADMIN_SECRET=YOUR_ADMIN_SECRET
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

## 📚 API Documentation

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/google` | Google Sign-In |
| GET | `/api/reviews` | Fetch all reviews |
| POST | `/api/reviews` | Add a new review |
| PUT | `/api/reviews/{id}` | Update a review |
| DELETE | `/api/reviews/{id}` | Delete a review |
| GET | `/api/dashboard/stats` | Dashboard statistics |
| GET | `/api/dashboard/summary` | Generate AI review summary |

---

## 📂 Project Structure

```
TBI_Internship/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

---

## ⚙️ How It Works

1. Users register or log in using email/password or Google Sign-In.
2. Authenticated users can submit hotel reviews.
3. Reviews are securely stored in MongoDB Atlas.
4. Dashboard statistics and charts are generated from stored reviews.
5. Google Gemini AI analyzes customer feedback and produces concise review summaries.
6. Administrators can manage reviews and monitor platform analytics.

---

## ⚠️ Known Limitations

- Render's free tier may put the backend to sleep after periods of inactivity. The first request may take **30–60 seconds** while the server wakes up.
- AI summary generation depends on the availability of the Google Gemini API.
- Currently, reviews are managed through the dashboard only; advanced filtering and export functionality are planned for future updates.

---

## 🙏 Credits & Acknowledgements

This project was developed as part of the **TBI-GEU Full Stack Internship Program**.

Special thanks to:

- Graphic Era (Deemed to be University)
- TBI Internship Mentors
- Google Gemini AI
- React.js
- FastAPI
- MongoDB Atlas
- Tailwind CSS
- Recharts
- Vercel
- Render
- GitHub

The project was built to strengthen practical knowledge of full-stack web development, AI integration, authentication, deployment, and cloud-based application development.

---

## 👩‍💻 Developer

**Alice Gupta**

B.Tech Computer Science Engineering  
Graphic Era (Deemed to be University), Dehradun

GitHub: https://github.com/alicegupta24

---

## 📄 License

This project was developed for educational purposes as part of the TBI-GEU Internship Program.