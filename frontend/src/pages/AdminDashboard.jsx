import DashboardCharts from "../components/DashboardCharts";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatCard from "../components/StatCard";
const API_URL = import.meta.env.VITE_API_URL;
function AdminDashboard({ darkMode, setDarkMode }) {
 const [stats, setStats] = useState({
  total_reviews: 0,
  average_rating: 0,
  registered_users: 0,
  positive_reviews: 0,
  neutral_reviews: 0,
  negative_reviews: 0,
});
const [reviews, setReviews] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [ratingFilter, setRatingFilter] = useState("all");

const [aiSummary, setAiSummary] = useState("");
const [loadingSummary, setLoadingSummary] = useState(false);
const deleteReview = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this review?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_URL}/api/admin/reviews/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert(data.message);

      // Temporary solution
      window.location.reload();
    } else {
      alert(data.detail);
    }

  } catch (err) {
    console.error("Delete Error:", err);
  }
};
const fetchAISummary = async () => {
  try {
    setLoadingSummary(true);

    const token = localStorage.getItem("token");

    const response = await fetch(
  `${API_URL}/api/admin/ai-summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      setAiSummary(data.summary);
    }
  } catch (err) {
    console.error("AI Summary Error:", err);
  } finally {
    setLoadingSummary(false);
  }
};

useEffect(() => {
  async function fetchData() {
    try {
      const token = localStorage.getItem("token");

      // Dashboard statistics
      const statsResponse = await fetch(
        `${API_URL}/api/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const statsData = await statsResponse.json();
      console.log("Stats Response:", statsData);
      if (statsResponse.ok) {
        setStats(statsData);
      }

      // Reviews
      const reviewsResponse = await fetch(
        `${API_URL}/api/admin/reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const reviewsData = await reviewsResponse.json();

      if (reviewsResponse.ok) {
        setReviews(reviewsData);
        console.log("Reviews Data:", reviewsData);
        console.log("Chart Data:", chartData);
      }

      // AI Summary
      await fetchAISummary();

    } catch (err) {
      console.error("Error:", err);
    }
  }

  fetchData();
}, []);

const filteredReviews = reviews.filter((review) => {
  const guest = (review.guest || review.guest_name || "").toLowerCase();
  const reviewText = (review.review || "").toLowerCase();

  const matchesSearch =
    guest.includes(searchTerm.toLowerCase()) ||
    reviewText.includes(searchTerm.toLowerCase());

  const matchesRating =
    ratingFilter === "all" ||
    review.rating === Number(ratingFilter);

  return matchesSearch && matchesRating;
});

const chartData = [
  {
    rating: "1★",
    count: reviews.filter((r) => r.rating === 1).length,
  },
  {
    rating: "2★",
    count: reviews.filter((r) => r.rating === 2).length,
  },
  {
    rating: "3★",
    count: reviews.filter((r) => r.rating === 3).length,
  },
  {
    rating: "4★",
    count: reviews.filter((r) => r.rating === 4).length,
  },
  {
    rating: "5★",
    count: reviews.filter((r) => r.rating === 5).length,
  },
];
  return (
  <>
    <Navbar
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />

    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8">

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-2">
        Admin Dashboard
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Welcome to StayInsight Analytics
      </p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard
          title="Total Reviews"
          value={stats.total_reviews}
          color="text-blue-600"
        />

        <StatCard
          title="Average Rating"
          value={`${stats.average_rating} ⭐`}
          color="text-yellow-500"
        />

        <StatCard
          title="Registered Users"
          value={stats.registered_users}
          color="text-purple-600"
        />

        <StatCard
          title="Positive Reviews"
          value={stats.positive_reviews}
          color="text-green-600"
        />

        <StatCard
          title="Neutral Reviews"
          value={stats.neutral_reviews}
          color="text-orange-500"
        />

        <StatCard
          title="Negative Reviews"
          value={stats.negative_reviews}
          color="text-red-600"
        />

      </div>

      {/* Rating Distribution */}
        <DashboardCharts reviews={reviews} />

      {/* AI Review Summary */}
      <div className="mt-10 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-2xl font-bold">
            🤖 AI Review Summary
          </h2>

          <button
            onClick={fetchAISummary}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Regenerate
          </button>

        </div>

        {loadingSummary ? (

          <p className="text-gray-500">
            Generating AI insights...
          </p>

        ) : (

          <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-7">
            {aiSummary}
          </div>

        )}

      </div>

      {/* Reviews Table */}
      <div className="mt-10 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

          <h2 className="text-2xl font-bold">
            All Reviews
          </h2>

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="🔍 Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            >
              <option value="all">All Ratings</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

                <tr className="bg-blue-600 text-white">

                    <th className="p-3 text-left">Guest</th>
                    <th className="p-3 text-left">Review</th>
                    <th className="p-3 text-center">Rating</th>
                    <th className="p-3 text-center">Date</th>
                    <th className="p-3 text-center">Action</th>

                </tr>

            </thead>

            <tbody>

              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <tr
                    key={review.id}
                    className="border-b hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <td className="p-3">
                      {review.guest || review.guest_name || "Unknown Guest"}
                    </td>

                    <td className="p-3">
                      {review.review}
                    </td>

                    <td className="p-3 text-center">
                      {"⭐".repeat(review.rating)}
                    </td>

                    <td className="p-3 text-center">
                      {review.created_at || "-"}
                    </td>
                    <td className="p-3 text-center">
                        <button
                            onClick={() => deleteReview(review.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                        >
                            Delete
                        </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-6 text-gray-500"
                  >
                    No matching reviews found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

    <Footer />
  </>
);
}

export default AdminDashboard;