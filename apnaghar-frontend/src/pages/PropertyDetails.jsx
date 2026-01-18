import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createBooking } from "../services/bookingService";
import { getPropertyById } from "../services/propertyService";
import { getRatingSummary } from "../services/reviewService";
import { getToken } from "../utils/auth";
import ReviewForm from "../components/Reviews/ReviewForm";
import ReviewsList from "../components/Reviews/ReviewsList";
import "./PropertyDetails.css";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [ratingSummary, setRatingSummary] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const pRes = await getPropertyById(id);
      setProperty(pRes.data);

      try {
        const rRes = await getRatingSummary(id);
        setRatingSummary(rRes.data);
      } catch {
        setRatingSummary(null);
      }
    } catch (err) {
      alert("Property not found");
      navigate("/properties");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    const token = getToken();

    if (!token) {
      alert("Please login to book this property");
      navigate("/login");
      return;
    }

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
    return <p style={{ padding: "120px", textAlign: "center" }}>Loading property...</p>;
  }

  if (!property) return null;

  return (
    <div className="property-details-page">
      {/* BANNER */}
      <div className="details-banner">
        <img
          src={
            property.imageUrl ||
            "https://images.unsplash.com/photo-1560185008-5f0bb1866cab"
          }
          alt={property.title}
        />
        <div className="banner-overlay">
          <h1>{property.title}</h1>
          <p>{property.location}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="details-container">
        {/* LEFT INFO */}
        <div className="details-info">
          {ratingSummary && (
            <div className="rating-row">
              <Stars rating={ratingSummary.averageRating} />
              <span>
                {ratingSummary.averageRating.toFixed(1)} / 5 ·{" "}
                {ratingSummary.totalReviews} reviews
              </span>
            </div>
          )}

          <div className="info-cards">
            <div className="info-box">
              <h4>Rent</h4>
              <p>₹ {property.rent} / month</p>
            </div>

            <div className="info-box">
              <h4>Type</h4>
              <p>{property.type}</p>
            </div>

            <div className="info-box">
              <h4>Status</h4>
              <p>{property.available ? "Available" : "Occupied"}</p>
            </div>
          </div>

          <div className="amenities-box">
            <h3>Amenities</h3>
            <p>{property.amenities}</p>
          </div>

          {!property.available && (
            <p className="unavailable-text">
              Currently unavailable for booking
            </p>
          )}
        </div>

        {/* BOOKING CARD */}
        <div className="booking-card">
          <h3>Book This Property</h3>

          <div className="date-group">
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={!property.available}
            />
          </div>

          <div className="date-group">
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={!property.available}
            />
          </div>

          <button
            className="book-btn"
            onClick={handleBookNow}
            disabled={!property.available}
          >
            {property.available ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="reviews-section">
        <h3>Reviews</h3>
        <ReviewForm propertyId={id} />
        <ReviewsList propertyId={id} />
      </div>
    </div>
  );
}

/* STAR UI */
function Stars({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  return (
    <span className="star-row">
      {"★".repeat(fullStars)}
      {halfStar && "☆"}
      {"☆".repeat(5 - fullStars - (halfStar ? 1 : 0))}
    </span>
  );
}

export default PropertyDetails;
