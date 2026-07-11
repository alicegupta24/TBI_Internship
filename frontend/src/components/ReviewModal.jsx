function ReviewModal({ review, onClose }) {
  if (!review) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl p-8 w-[500px] shadow-2xl">

        <h2 className="text-3xl font-bold mb-2">
          {review.guest}
        </h2>

        <p className="text-yellow-500 text-xl mb-4">
          ⭐ {review.rating}/5
        </p>

        <p className="text-gray-600 leading-8">
          {review.review}
        </p>

        <div className="mt-6">

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              review.rating >= 4
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {review.rating >= 4
              ? "Positive Review"
              : "Needs Attention"}
          </span>

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default ReviewModal;