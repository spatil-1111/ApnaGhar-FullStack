import { useState } from "react";
import api from "../../services/api";

function ReviewForm({ propertyId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = () => {
    api.post(
      `/reviews?propertyId=${propertyId}&rating=${rating}&comment=${comment}`
    )
      .then(() => {
        alert("Review submitted successfully");
        setComment("");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Cannot submit review");
      });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Add Your Review</h4>

      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value={5}>⭐⭐⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={1}>⭐</option>
      </select>

      <br />

      <textarea
        placeholder="Write your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <br />

      <button onClick={submitReview}>Submit Review</button>
    </div>
  );
}

export default ReviewForm;
