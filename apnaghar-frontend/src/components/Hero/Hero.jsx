import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/auth";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const user = getUser(); // logged-in user

  const handleListProperty = () => {
    if (!user) {
      alert("Please login as owner to list your property.");
      navigate("/login");
      return;
    }

    if (user.role === "OWNER") {
      navigate("/profile"); // owner dashboard
    } else {
      alert("Only property owners can list properties.");
    }
  };

  return (
    <section className="hero" data-aos="fade-up">
      <div className="hero-content">
        <h1>Find Your Perfect Home with ApnaGhar</h1>
        <p>
          PGs, Hostels, Flats & Rooms — all in one trusted platform.
        </p>

        <div className="hero-buttons">
          {/* ✅ EXPLORE PROPERTIES */}
          <button
            className="primary-btn"
            onClick={() => navigate("/properties")}
          >
            Explore Properties
          </button>

          {/* ✅ LIST YOUR PROPERTY — ROLE BASED */}
          <button
            className="secondary-btn"
            onClick={handleListProperty}
          >
            List Your Property
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
