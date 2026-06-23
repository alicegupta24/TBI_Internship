import { useEffect, useState } from "react";

function Dashboard() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Guest Reviews</h1>

      {reviews.map((review) => (
        <div key={review.id} className="border p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{review.guest}</h2>
          <p>{review.review}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;