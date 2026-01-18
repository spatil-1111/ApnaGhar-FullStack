import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import {
  getAllProperties,
  searchByLocation,
  searchByType,
  searchByLocationAndType,
} from "../services/propertyService";
import "./Properties.css";

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
    return <p className="prop-loading">Loading properties...</p>;
  }

  return (
    <div className="properties-page">
      {/* HEADER */}
      <div className="prop-header">
        <h2>Find Your Perfect Stay</h2>
        <p>Browse PGs, Hostels and Flats across top cities</p>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value=""> Location</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value=""> Property Type</option>
          <option value="PG">PG</option>
          <option value="HOSTEL">Hostel</option>
          <option value="FLAT">Flat</option>
        </select>

        <button onClick={loadProperties} className="filter-btn">
          Search
        </button>

        <button onClick={clearFilters} className="clear-btn">
          Reset
        </button>
      </div>

      {/* PROPERTY GRID */}
      {properties.length === 0 ? (
        <div className="empty-box">
          <h3>No properties found </h3>
          <p>Try changing filters or browse all listings</p>
        </div>
      ) : (
        <div className="property-grid">
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
      )}

      {/* PAGINATION */}
      {!location && !type && totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            className="page-btn"
          >
            ← Previous
          </button>

          <span className="page-text">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages - 1}
            className="page-btn"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default Properties;
