import { useState } from "react";
import { Star } from "lucide-react";
function AddReviewModal({ open, onClose, refreshReviews }) {
  const [guest, setGuest] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  if (!open) return null;

  async function handleSubmit() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          guest,
          review,
          rating: Number(rating),
        }),
      });

      if (response.ok) {
        setGuest("");
        setReview("");
        setRating(5);

        refreshReviews();
        onClose();

        alert("Review Added Successfully!");
      } else {
        const data = await response.json();
        alert(data.detail);
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl p-8 w-[500px]">

        <h2 className="text-3xl font-bold mb-6">
          Add Review
        </h2>

        <input
          type="text"
          placeholder="Guest Name"
          value={guest}
          onChange={(e) => setGuest(e.target.value)}
          className="w-full border rounded-xl p-3 mb-4"
        />

        <textarea
          placeholder="Write Review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border rounded-xl p-3 mb-4"
          rows="4"
        />
        <div className="mb-6">

            <p className="font-semibold text-gray-700 mb-3">
                Rating
            </p>

            <div className="flex gap-2">

                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                    key={star}
                    size={32}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer transition duration-200 ${
                        star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                    />
                

                ))}

            </div>

            </div>


        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white"
          >
            Add Review
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddReviewModal;