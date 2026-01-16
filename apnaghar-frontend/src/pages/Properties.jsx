import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import {
  getAllProperties,
  searchByLocation,
  searchByType,
  searchByLocationAndType,
} from "../services/propertyService";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    loadProperties();
    // eslint-disable-next-line
  }, [page]);

  const loadProperties = () => {
    setLoading(true);

    // 🔍 FILTER LOGIC
    if (location && type) {
      searchByLocationAndType(location, type).then(handleSearchResponse);
    } else if (location) {
      searchByLocation(location).then(handleSearchResponse);
    } else if (type) {
      searchByType(type).then(handleSearchResponse);
    } else {
      getAllProperties(page).then((res) => {
        setProperties(res.data.content);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      });
    }
  };

  const handleSearchResponse = (res) => {
    setProperties(res.data);
    setTotalPages(1);
    setPage(0);
    setLoading(false);
  };

  const clearFilters = () => {
    setLocation("");
    setType("");
    setPage(0);
    loadProperties();
  };

  if (loading) {
    return <p style={{ padding: "60px" }}>Loading properties...</p>;
  }

  return (
    <div style={{ padding: "60px" }}>
      <h2 style={{ marginBottom: "24px" }}>Available Properties</h2>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select Location</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="PG">PG</option>
          <option value="HOSTEL">Hostel</option>
          <option value="FLAT">Flat</option>
        </select>

        <button onClick={loadProperties} style={filterBtn}>
          Apply
        </button>

        <button onClick={clearFilters} style={clearBtn}>
          Clear
        </button>
      </div>

      {/* PROPERTY GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
        }}
      >
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            title={property.title}
            location={property.location}
            price={property.rent}
            image={property.imageUrl}
          />
        ))}
      </div>

      {/* PAGINATION (only when no filters) */}
      {!location && !type && (
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            style={paginationBtn}
          >
            Previous
          </button>

          <span style={{ alignSelf: "center" }}>
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages - 1}
            style={paginationBtn}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

const filterBtn = {
  padding: "8px 14px",
  backgroundColor: "#328cc1",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const clearBtn = {
  padding: "8px 14px",
  backgroundColor: "#999",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const paginationBtn = {
  padding: "8px 14px",
  backgroundColor: "#328cc1",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

export default Properties;
