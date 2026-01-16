import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";

function PropertyCard({ id, title, location, price, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Clicked property ID:", id); // 🔍 DEBUG
    navigate(`/property/${id}`);
  };

  return (
    <div
      className="property-card"
      data-aos="zoom-in"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img src={image} alt={title} className="property-image" />

      <div className="property-info">
        <h3>{title}</h3>
        <p className="location">{location}</p>
        <p className="price">₹ {price} / month</p>
      </div>
    </div>
  );
}

export default PropertyCard;
