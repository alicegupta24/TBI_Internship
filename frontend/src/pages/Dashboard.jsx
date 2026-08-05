import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import ReviewModal from "../components/ReviewModal";
import DashboardCharts from "../components/DashboardCharts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddReviewModal from "../components/AddReviewModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditReviewModal from "../components/EditReviewModal";
import {
  Search,
  Star,
  MessageSquare,
  Users,
  Smile,
  LogOut,
} from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;
function Dashboard({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryTime, setSummaryTime] = useState("");
  const [search, setSearch] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const currentUser = localStorage.getItem("email");
  const [showAddModal, setShowAddModal] = useState(false);

function loadReviews() {
  const token = localStorage.getItem("token");

  fetch(`${API_URL}/api/reviews`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return null;
      }

      return res.json();
    })
    .then((data) => {
      if (data) {
        setReviews(data);
      }
    })
    .catch((err) => console.error(err));
}
  async function generateSummary() {
  const token = localStorage.getItem("token");

  setLoadingSummary(true);

  try {
   const response = await fetch(
  `${API_URL}/api/ai/summarize`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    const data = await response.json();

    if (response.ok) {
    setSummary(data.summary);
    setSummaryTime(new Date().toLocaleString());
} else {
      alert(data.detail || "Failed to generate summary.");
    }
  } catch (error) {
    console.error(error);
    alert("Unable to connect to the server.");
  } finally {
    setLoadingSummary(false);
  }
}
useEffect(() => {
  loadReviews();
}, []);
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  const filteredReviews = reviews.filter((review) => {
  const guest = (review.guest || review.guest_name || "").toLowerCase();
  const text = (review.review || "").toLowerCase();
  const query = search.toLowerCase();

  return guest.includes(query) || text.includes(query);
});

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  async function deleteReview(id) {
  const ok = window.confirm("Delete this review?");

  if (!ok) return;

  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/reviews/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
if (response.ok) {
    setSummary("");
    setSummaryTime("");
    loadReviews();
}
  else {
    alert(data.detail);
  }
}

  return (
    <>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto py-12 px-6">

          {/* Header */}

        <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Review Dashboard
              </h1>
              <p className="text-gray-600 dark:text-slate-300 mt-2">
                Monitor guest feedback and analyze customer satisfaction.
              </p>
            </div>
            <div className="flex gap-4 mt-5 md:mt-0">

              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
              >
                + Add Review
              </button>
              <button
                onClick={generateSummary}
                disabled={loadingSummary}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl shadow-lg transition"
              >
                {loadingSummary ? (
                  <span>⏳ Generating Summary...</span>
                ) : (
                  "🤖 AI Summary"
                )}
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>
         </motion.div>

{/* Statistics Cards */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          >

            {/* Total Reviews */}
            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Reviews
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {reviews.length}
                  </h2>

                  <p className="text-blue-600 text-sm mt-3">
                    Guest Feedback
                  </p>

                </div>

                <div className="bg-blue-100 p-4 rounded-2xl">

                  <MessageSquare
                    className="text-blue-600"
                    size={30}
                  />

                </div>

              </div>

            </div>

            {/* Average Rating */}

            <div className="bg-gradient-to-br from-yellow-50 to-white dark:from-slate-800 dark:to-slate-900 border border-yellow-100 dark:border-slate-700 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-sm">
                    Average Rating
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {averageRating}
                  </h2>

                  <p className="text-yellow-600 text-sm mt-3">
                    Overall Score
                  </p>

                </div>

                <div className="bg-yellow-100 p-4 rounded-2xl">

                  <Star
                    className="text-yellow-500"
                    size={30}
                  />

                </div>

              </div>

            </div>

            {/* Positive Reviews */}

            <div className="bg-gradient-to-br from-green-50 to-white dark:from-slate-800 dark:to-slate-900 border border-green-100 dark:border-slate-700 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-sm">
                    Positive Reviews
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {reviews.filter((r) => r.rating >= 4).length}
                  </h2>

                  <p className="text-green-600 text-sm mt-3">
                    Happy Guests
                  </p>

                </div>

                <div className="bg-green-100 p-4 rounded-2xl">

                  <Smile
                    className="text-green-600"
                    size={30}
                  />

                </div>

              </div>

            </div>

            {/* Guests */}

            <div className="bg-gradient-to-br from-purple-50 to-white dark:from-slate-800 dark:to-slate-900 border border-purple-100 dark:border-slate-700 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-sm">
                    Guests
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {new Set(reviews.map((r) => r.guest)).size}
                  </h2>

                  <p className="text-purple-600 text-sm mt-3">
                    Unique Visitors
                  </p>

                </div>

                <div className="bg-purple-100 p-4 rounded-2xl">

                  <Users
                    className="text-purple-600"
                    size={30}
                  />

                </div>

              </div>

            </div>

          </motion.div>

          {/* AI Review Summary */}

          {summary && (

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-10 mb-10 rounded-3xl border border-purple-200 dark:border-purple-800 bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-slate-900 shadow-2xl hover:shadow-purple-300/20 transition-all duration-300 p-8"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>

                  <h2 className="text-2xl font-bold text-purple-600">
                    🤖 AI Review Summary
                  </h2>

                  <p className="text-gray-500 dark:text-slate-400">
                    Generated using Google Gemini AI
                  </p>

                  {summaryTime && (

                    <p className="text-sm text-gray-400 mt-1">
                      Generated on {summaryTime}
                    </p>

                  )}

                </div>

                <button
                  onClick={generateSummary}
                  disabled={loadingSummary}
                  className="bg-purple-600 hover:bg-purple-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-xl shadow-lg transition-all duration-300"
                >

                  {loadingSummary ? "⏳ Generating..." : "🔄 Regenerate"}

                </button>

              </div>

              <div className="max-h-[450px] overflow-y-auto pr-2">

                <div className="prose prose-lg max-w-none dark:prose-invert">

                  <ReactMarkdown>

                    {summary}

                  </ReactMarkdown>

                </div>

              </div>

            </motion.div>

          )}
        {/* Charts */}
          <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <DashboardCharts reviews={reviews} />
        </motion.div>
        {/* Search */}
        <div className="relative mb-10">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"
            size={20}
          />

          <input
            type="text"
            placeholder="Search by guest or review..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white shadow-sm focus:shadow-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"          />

        </div>
 {/* Reviews */}

          <div className="grid md:grid-cols-2 gap-8 mt-10">

    {filteredReviews.length === 0 ? (

      <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-3xl shadow-md p-12 text-center">

        <h3 className="text-2xl font-semibold text-slate-800 dark:text-white">
          No reviews found
        </h3>

        <p className="mt-3 text-gray-500 dark:text-slate-400">
          Try searching with a different guest name or keyword.
        </p>

      </div>

    ) : (

      filteredReviews.map((review, index) => (

        <motion.div
    key={review.id + review.guest}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.35,
      delay: index * 0.05,
    }}
    onClick={() => setSelectedReview(review)}
    className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:-translate-y-2 cursor-pointer transition-all duration-300 p-6"
  >

    <div className="flex justify-between items-start">

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg">

          {(review.guest || review.guest_name || "?")
            .charAt(0)
            .toUpperCase()}

        </div>

        <div>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">

            {review.guest || review.guest_name}

          </h2>

          <p className="text-sm text-gray-500 dark:text-slate-400">

            Guest Review

          </p>

        </div>

      </div>

      <div className="text-right">

        <div className="text-yellow-500 font-bold text-lg">

          ⭐ {review.rating}/5

        </div>

        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
            review.rating >= 4
              ? "bg-green-100 text-green-700"
              : review.rating === 3
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >

          {review.rating >= 4
            ? "Positive"
            : review.rating === 3
            ? "Neutral"
            : "Needs Attention"}

        </span>

      </div>

    </div>

    <p className="mt-6 text-gray-600 dark:text-slate-300 leading-8 italic">

      "{review.review}"

    </p>

    <div className="mt-6 flex justify-between items-center">

      <span className="text-sm text-gray-400 dark:text-slate-500">

        📅 Reviewed on {review.created_at}

      </span>

      {review.user_email === currentUser && (

        <div className="flex gap-3">

          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditingReview(review);
            }}
            className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >

            Edit

          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteReview(review.id);
            }}
            className="px-4 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-600 hover:text-white transition-all duration-300"
          >

            Delete

          </button>

        </div>

      )}

    </div>

  </motion.div>

))
)}

</div>

</div>

</div>

<AddReviewModal
  open={showAddModal}
  onClose={() => setShowAddModal(false)}
  refreshReviews={loadReviews}
/>

<EditReviewModal
  open={editingReview !== null}
  review={editingReview}
  onClose={() => setEditingReview(null)}
  refreshReviews={loadReviews}
/>

<ReviewModal
  review={selectedReview}
  onClose={() => setSelectedReview(null)}
/>

<Footer />

</>
);
}

export default Dashboard;   