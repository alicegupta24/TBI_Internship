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

function Dashboard({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const currentUser = localStorage.getItem("email");
  const [showAddModal, setShowAddModal] = useState(false);
  function loadReviews() {
  const token = localStorage.getItem("token");

  fetch("http://127.0.0.1:8000/api/reviews", {
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

  const filteredReviews = reviews.filter(
    (review) =>
      review.review.toLowerCase().includes(search.toLowerCase()) ||
      review.guest.toLowerCase().includes(search.toLowerCase())
  );

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  async function deleteReview(id) {
  const ok = window.confirm("Delete this review?");

  if (!ok) return;

  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://127.0.0.1:8000/api/reviews/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (response.ok) {
    loadReviews();
  } else {
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

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">

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
              onClick={logout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition"
            >
              <LogOut size={18} />
              Logout
            </button>

            </div>

          </div>

          {/* Statistics Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Reviews
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {reviews.length}
                  </h2>

                  <p className="text-blue-600 text-sm mt-3">
                    Guest feedback
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

            <div className="bg-gradient-to-br from-yellow-50 to-white dark:from-slate-800 dark:to-slate-900 border border-yellow-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

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

            <div className="bg-gradient-to-br from-green-50 to-white dark:from-slate-800 dark:to-slate-900 border border-green-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

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

            <div className="bg-gradient-to-br from-purple-50 to-white dark:from-slate-800 dark:to-slate-900 border border-purple-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

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

          </div>

          {/* Search */}

          <div className="relative mb-10">

            <Search
              className="absolute left-4 top-4 text-gray-400 dark:text-slate-500"
              size={20}
            />

            <input
              type="text"
              placeholder="Search by guest or review..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          {/* Charts */}

          <DashboardCharts reviews={reviews} />

          {/* Reviews */}

          <div className="grid md:grid-cols-2 gap-8 mt-10">

            {filteredReviews.map((review) => (

              <div
                key={review.id + review.guest}
                onClick={() => setSelectedReview(review)}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-md p-6 hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all duration-300"
              >

                <div className="flex justify-between items-start">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">

                      {review.guest.charAt(0).toUpperCase()}

                    </div>

                    <div>

                      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                        {review.guest}
                      </h2>

                      <p className="text-gray-500 dark:text-slate-400 text-sm">
                        Guest Review
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <div className="text-yellow-500 font-semibold">
                      ⭐ {review.rating}/5
                    </div>

                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        review.rating >= 4
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {review.rating >= 4
                        ? "Positive"
                        : "Needs Attention"}
                    </span>

                  </div>

                </div>

                <p className="mt-6 text-gray-600 dark:text-slate-300 leading-8 italic">
                  "{review.review}"
                </p>

              <div className="mt-6 flex justify-between items-center">

                <span className="text-sm text-gray-400 dark:text-slate-500">
                  Reviewed on {review.created_at}
                </span>

              {review.user_email === currentUser && (
                <div className="flex gap-4">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingReview(review);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteReview(review.id);
                    }}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>

                </div>
              )}
              </div>
              </div>

            ))}

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