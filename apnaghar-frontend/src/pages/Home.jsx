import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import { getAllProperties } from "../services/propertyService";
import "./Home.css";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadFeatured();
  }, []);

  const loadFeatured = async () => {
    try {
      const res = await getAllProperties();

      let properties = [];

      if (Array.isArray(res.data)) {
        properties = res.data;
      } else if (res.data?.content) {
        properties = res.data.content;
      }

      const list = properties.slice(0, 3);
      setFeatured(list);
    } catch (err) {
      console.error("Featured load failed", err);
      setFeatured([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <Hero />

      {/* ===== FEATURED PROPERTIES ===== */}
      <section className="featured-section">
        <div className="featured-header">
          <h2>Featured Properties</h2>
          <p>Hand-picked stays for comfort, safety and convenience</p>
        </div>

        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

        <div className="featured-grid">
          {featured.map((p) => (
            <PropertyCard
              key={p.id}
              id={p.id}
              title={p.title}
              location={p.location}
              price={p.rent}
              image={p.imageUrl}
            />
          ))}
        </div>

        <div className="view-all-wrapper">
          <button
            className="view-all-btn"
            onClick={() => navigate("/properties")}
          >
            View All Properties →
          </button>
        </div>
      </section>

      {/* ===== WHY CHOOSE APNAGHAR ===== */}
      <section className="why-section">
        <h2>Why Choose ApnaGhar?</h2>

        <div className="why-grid">
          <div className="why-card">
            <span>🏠</span>
            <h4>Verified Listings</h4>
            <p>Only trusted and verified properties listed by real owners.</p>
          </div>

          <div className="why-card">
            <span>🔒</span>
            <h4>Secure Booking</h4>
            <p>Safe online booking with full transparency and records.</p>
          </div>

          <div className="why-card">
            <span>💬</span>
            <h4>Real Reviews</h4>
            <p>Genuine reviews from people who actually stayed there.</p>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats-section">
        <div className="stat-box">
          <h3>10,000+</h3>
          <p>Happy Users</p>
        </div>

        <div className="stat-box">
          <h3>50+</h3>
          <p>Cities Covered</p>
        </div>

        <div className="stat-box">
          <h3>5,000+</h3>
          <p>Properties Listed</p>
        </div>
      </section>

      {/* ===== CALL TO ACTION ===== */}
      <section className="cta-section">
        <h2>Own a Property? Start Earning Today</h2>
        <p>List your property on ApnaGhar and reach thousands of tenants.</p>
        <button onClick={() => navigate("/profile")}>
          List Your Property →
        </button>
      </section>
    </div>
  );
}

export default Home;
