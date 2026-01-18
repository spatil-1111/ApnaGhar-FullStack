import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/auth";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const user = getUser();

  const handleListProperty = () => {
    if (!user) {
      alert("Please login as owner to list your property.");
      navigate("/login");
      return;
    }

    if (user.role === "OWNER") {
      navigate("/profile");
    } else {
      alert("Only property owners can list properties.");
    }
  };

  return (
    <section className="hero-section">
      {/* 🔥 Overlay */}
      <div className="hero-overlay"></div>

      {/* 🔥 Content */}
      <div className="hero-content" data-aos="fade-up">
        <h1>
          Find Your <span>Perfect Home</span> with ApnaGhar
        </h1>

        <p>
          PGs, Hostels, Flats & Rooms — all in one trusted platform across India.
        </p>

        <div className="hero-buttons">
          <button
            className="hero-btn primary"
            onClick={() => navigate("/properties")}
          >
            Explore Properties
          </button>

          <button
            className="hero-btn secondary"
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
