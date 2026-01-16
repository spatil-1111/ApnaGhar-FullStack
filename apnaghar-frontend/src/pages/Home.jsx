import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import { getAllProperties } from "../services/propertyService";

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

      console.log(" Properties API Response:", res.data);

      // ✅ HANDLE BOTH ARRAY AND PAGINATED RESPONSE
      let properties = [];

      if (Array.isArray(res.data)) {
        properties = res.data;
      } else if (res.data?.content) {
        properties = res.data.content; // pagination case
      }

      const list = properties.slice(0, 3); // first 3 as featured
      setFeatured(list);

    } catch (err) {
      console.error("Featured load failed", err);
      setFeatured([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero />

      {/* ================= FEATURED SECTION ================= */}
      <section style={{ padding: "60px", background: "#f7f9fc" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>
            Featured Properties
          </h2>
          <p style={{ color: "#666" }}>
            Hand-picked stays for comfort, safety and convenience
          </p>
        </div>

        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
            maxWidth: "1100px",
            margin: "auto",
          }}
        >
          {/* ✅ BACKEND DATA */}
          {featured.map((p) => (
            <PropertyCard
              key={p.id}
              id={p.id}                 // ✅ VERY IMPORTANT
              title={p.title}
              location={p.location}
              price={p.rent}
              image={p.imageUrl}
            />
          ))}

          {/* FALLBACK ONLY IF NO DATA */}
          {!loading && featured.length === 0 && (
            <>
              <PropertyCard
                title="Luxury PG for Boys"
                location="Pune, Wakad"
                price="8500"
                image="https://images.unsplash.com/photo-1598928506311-c55ded91a20c"
              />
              <PropertyCard
                title="Girls Hostel"
                location="Bangalore, Whitefield"
                price="9500"
                image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              />
              <PropertyCard
                title="1 BHK Flat"
                location="Mumbai, Andheri"
                price="18000"
                image="https://images.unsplash.com/photo-1560185008-5f0bb1866cab"
              />
            </>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={() => navigate("/properties")}
            style={{
              padding: "12px 28px",
              background: "#328cc1",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            View All Properties →
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;
