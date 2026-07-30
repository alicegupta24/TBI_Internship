import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;
function EditReviewModal({
  open,
  onClose,
  review,
  refreshReviews,
}) 
{
  const [guest, setGuest] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (review) {
      setGuest(review.guest);
      setReviewText(review.review);
      setRating(review.rating);
    }
  }, [review]);
async function handleUpdate() {
  const token = localStorage.getItem("token");

  try {
   const response = await fetch(
  `${API_URL}/api/reviews/${review.id}`,
  {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          guest,
          review: reviewText,
          rating: Number(rating),
        }),
      }
    );

    if (response.ok) {
      refreshReviews();
      onClose();
      alert("Review Updated Successfully!");
    } else {
      const data = await response.json();
      alert(data.detail);
    }
  } catch (err) {
    console.error(err);
    alert("Server Error");
  }
}
  if (!open || !review) return null;

return (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

    <div className="bg-white rounded-3xl p-8 w-[500px]">

      <h2 className="text-3xl font-bold mb-6">
        Edit Review
      </h2>

      <input
        type="text"
        value={guest}
        onChange={(e) => setGuest(e.target.value)}
        className="w-full border rounded-xl p-3 mb-4"
      />

      <textarea
        rows="4"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="w-full border rounded-xl p-3 mb-4"
      />

      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full border rounded-xl p-3 mb-6"
      />

      <div className="flex justify-end gap-4">

        <button
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          className="px-5 py-2 rounded-xl bg-blue-600 text-white"
        >
          Update Review
        </button>

      </div>

    </div>

  </div>
);
}

export default EditReviewModal;
