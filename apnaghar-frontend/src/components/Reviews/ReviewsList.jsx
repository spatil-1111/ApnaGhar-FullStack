import { useEffect, useState } from "react";
import api from "../../services/api";

function ReviewsList({ propertyId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get(`/reviews/property/${propertyId}`)
      .then((res) => setReviews(res.data))
      .catch(() => {});
  }, [propertyId]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Reviews</h3>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map((r) => (
        <div
          key={r.id}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "10px",
            marginTop: "8px",
          }}
        >
          <b>{r.user.name || "User"}</b> — ⭐ {r.rating}/5
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewsList;
