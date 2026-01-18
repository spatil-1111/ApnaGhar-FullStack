import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";

function PropertyCard({ id, title, location, price, image }) {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="property-card">
      {/* CLICKABLE IMAGE */}
      <div className="image-wrapper" onClick={goToDetails}>
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1560185008-5f0bb1866cab"
          }
          alt={title}
          className="property-image"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1560185008-5f0bb1866cab";
          }}
        />

        <div className="price-badge">₹ {price} / mo</div>
      </div>

      {/* CLICKABLE INFO */}
      <div className="property-info" onClick={goToDetails}>
        <h3 title={title}>{title}</h3>
        <p className="location">{location}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
