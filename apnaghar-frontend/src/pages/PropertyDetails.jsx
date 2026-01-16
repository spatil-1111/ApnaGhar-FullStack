import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createBooking } from "../services/bookingService";
import { getPropertyById } from "../services/propertyService";
import { getRatingSummary } from "../services/reviewService";
import { getToken } from "../utils/auth";
import ReviewForm from "../components/Reviews/ReviewForm";
import ReviewsList from "../components/Reviews/ReviewsList";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [ratingSummary, setRatingSummary] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    // ✅ LOGIN REQUIRED
    if (!token) {
      alert("Please login to view property details");
      navigate("/login");
      return;
    }

    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const pRes = await getPropertyById(id);
      setProperty(pRes.data);

      // ⭐ rating summary is optional (may give 403)
      try {
        const rRes = await getRatingSummary(id);
        setRatingSummary(rRes.data);
      } catch (err) {
        console.warn("Rating summary not accessible");
        setRatingSummary(null);
      }

    } catch (err) {
      console.error(err);
      alert("Property not found or access denied");
      navigate("/properties");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!startDate || !endDate) {
      alert("Please select start and end dates");
      return;
    }

    createBooking(id, { startDate, endDate })
      .then(() => alert("Booking created successfully!"))
      .catch((error) => {
        if (error.response?.status === 400) {
          alert("Property already booked for selected dates");
        } else {
          alert("Booking failed");
        }
      });
  };

  if (loading) {
    return <p style={{ padding: "60px" }}>Loading property...</p>;
  }

  // ✅ SAFETY — NO CRASH
  if (!property) return null;

  return (
    <div style={{ padding: "60px", maxWidth: "1100px", margin: "auto" }}>
      <img
        src={property.imageUrl}
        alt={property.title}
        style={{
          width: "100%",
          height: "420px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      />

      <h2>{property.title}</h2>

      {/* ⭐ RATING SUMMARY */}
      {ratingSummary && (
        <div style={{ marginBottom: "10px" }}>
          <Stars rating={ratingSummary.averageRating} />
          <span style={{ marginLeft: "8px", color: "#666" }}>
            ({ratingSummary.averageRating.toFixed(1)} / 5) ·{" "}
            {ratingSummary.totalReviews} reviews
          </span>
        </div>
      )}

      <p style={{ color: "#666", marginBottom: "12px" }}>
        {property.location}
      </p>

      <h3 style={{ color: "#0b3c5d", marginBottom: "16px" }}>
        ₹ {property.rent} / month
      </h3>

      <p style={{ lineHeight: "1.7", marginBottom: "24px" }}>
        {property.amenities}
      </p>

      {!property.available && (
        <p style={{ color: "red", marginBottom: "16px", fontWeight: "bold" }}>
          This property is currently unavailable
        </p>
      )}

      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <div>
          <label>Start Date</label>
          <br />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={!property.available}
          />
        </div>

        <div>
          <label>End Date</label>
          <br />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={!property.available}
          />
        </div>
      </div>

      <button
        onClick={handleBookNow}
        disabled={!property.available}
        style={{
          backgroundColor: property.available ? "#328cc1" : "#999",
          color: "#ffffff",
          border: "none",
          padding: "14px 28px",
          fontSize: "16px",
          cursor: property.available ? "pointer" : "not-allowed",
          borderRadius: "4px",
        }}
      >
        {property.available ? "Book Now" : "Unavailable"}
      </button>

      {/* ⭐ REVIEWS SECTION */}
      <div style={{ marginTop: "50px" }}>
        <h3>Reviews</h3>
        <ReviewForm propertyId={id} />
        <ReviewsList propertyId={id} />
      </div>
    </div>
  );
}

/* ⭐ STAR UI */
function Stars({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  return (
    <span style={{ color: "#f5b50a", fontSize: "18px" }}>
      {"★".repeat(fullStars)}
      {halfStar && "☆"}
      {"☆".repeat(5 - fullStars - (halfStar ? 1 : 0))}
    </span>
  );
}

export default PropertyDetails;
