import { useEffect, useState } from "react";
import api from "../../services/api";
import OwnerAddProperty from "../../pages/OwnerAddProperty";

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadProperties = () => {
    setLoading(true);
    api.get("/properties/owner")
      .then((res) => {
        setProperties(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load properties");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const startEdit = (property) => {
    setEditingId(property.id);
    setFormData({ ...property });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "available"
          ? value === "true"
          : value,
    });
  };

  const saveEdit = () => {
    api.put(`/properties/${editingId}`, {
      title: formData.title,
      type: formData.type,
      location: formData.location,
      rent: Number(formData.rent),
      bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
      amenities: formData.amenities,
      available: formData.available === true || formData.available === "true",
    })
      .then(() => {
        alert("Property updated successfully");
        setEditingId(null);
        loadProperties();
      })
      .catch(() => {
        alert("Update failed");
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this property?")) return;

    api.delete(`/properties/${id}`)
      .then(() => {
        alert("Property deleted");
        loadProperties();
      })
      .catch(() => alert("Delete failed"));
  };

  if (loading) return <p>Loading your properties...</p>;

  return (
    <div>
      <h3 style={{ marginBottom: "16px" }}>My Properties</h3>

      {/* ➕ ADD PROPERTY BUTTON */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        style={addBtn}
      >
        {showAddForm ? "Back to Properties" : "+ Add Property"}
      </button>

      {/* ADD PROPERTY FORM */}
     {showAddForm && (
        <div style={{ marginTop: "20px" }}>
            <OwnerAddProperty
            onSuccess={() => {
                setShowAddForm(false);
                loadProperties();
            }}
            />
        </div>
        )}


      {/* PROPERTY LIST */}
      {!showAddForm &&
        properties.map((property) => (
          <div
            key={property.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginTop: "20px",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={property.imageUrl}
              alt={property.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />

            <div style={{ padding: "16px" }}>
              <h4>{property.title}</h4>
              <p>{property.location}</p>
              <p><strong>₹ {property.rent}</strong></p>
              <p>Status: {property.available ? "Available" : "Occupied"}</p>

              <button onClick={() => startEdit(property)} style={btnEdit}>
                Edit
              </button>

              <button onClick={() => handleDelete(property.id)} style={btnDelete}>
                Delete
              </button>
            </div>

            {editingId === property.id && (
              <div style={editBox}>
                <input name="title" value={formData.title} onChange={handleChange} />
                <input name="type" value={formData.type} onChange={handleChange} />
                <input name="location" value={formData.location} onChange={handleChange} />
                <input name="rent" type="number" value={formData.rent} onChange={handleChange} />
                <input name="bedrooms" type="number" value={formData.bedrooms || ""} onChange={handleChange} />
                <textarea name="amenities" value={formData.amenities || ""} onChange={handleChange} />

                <select name="available" value={formData.available} onChange={handleChange}>
                  <option value="true">Available</option>
                  <option value="false">Occupied</option>
                </select>

                <button onClick={saveEdit} style={btnSave}>Save</button>
                <button onClick={() => setEditingId(null)} style={btnCancel}>Cancel</button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

/* ---------- Styles ---------- */

const addBtn = {
  padding: "10px 16px",
  backgroundColor: "#328cc1",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const editBox = {
  padding: "16px",
  borderTop: "1px solid #ddd",
  backgroundColor: "#f9f9f9",
  display: "grid",
  gap: "10px",
};

const btnEdit = {
  marginRight: "10px",
  padding: "6px 12px",
};

const btnDelete = {
  padding: "6px 12px",
  backgroundColor: "red",
  color: "#fff",
  border: "none",
};

const btnSave = {
  padding: "6px 12px",
  backgroundColor: "green",
  color: "#fff",
  border: "none",
};

const btnCancel = {
  padding: "6px 12px",
  backgroundColor: "gray",
  color: "#fff",
  border: "none",
};

export default MyProperties;
