import { useEffect, useState } from "react";
import api from "../../services/api";
import OwnerAddProperty from "../../pages/OwnerAddProperty";
import { uploadImage } from "../../services/imageService";
import "./MyProperties.css";

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [newImageFile, setNewImageFile] = useState(null);
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
    setNewImageFile(null);
  };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: name === "available" ? value === "true" : value,
  });
};


  const handleImageChange = (e) => {
    setNewImageFile(e.target.files[0]);
  };

  const saveEdit = async () => {
    try {
      let imageUrl = formData.imageUrl;

      if (newImageFile) {
        const imgRes = await uploadImage(newImageFile);
        imageUrl = imgRes.data;
      }

      await api.put(`/properties/${editingId}`, {
        title: formData.title,
        type: formData.type,
        location: formData.location,
        rent: Number(formData.rent),
        bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
        amenities: formData.amenities,
        available: formData.available === true || formData.available === "true",
        imageUrl: imageUrl,
      });

      alert("Property updated successfully");
      setEditingId(null);
      loadProperties();
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      alert("Update failed");
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this property?")) return;

    api.delete(`/properties/${id}`)
      .then(() => {
        alert("Property deleted");
        loadProperties();
      })
      .catch((error) => {
        const msg = error.response?.data || "Delete failed";
        alert(msg);
      });
  };

  if (loading) return <p className="myprop-loading">Loading your properties...</p>;

  return (
    <div className="myprop-page">
      <div className="myprop-header">
        <h3>My Properties</h3>

        <button
          className="add-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Back to Properties" : "+ Add Property"}
        </button>
      </div>

      {showAddForm && (
        <div className="add-form-box">
          <OwnerAddProperty
            onSuccess={() => {
              setShowAddForm(false);
              loadProperties();
            }}
          />
        </div>
      )}

      {!showAddForm && (
        <div className="myprop-grid">
          {properties.map((property) => (
            <div key={property.id} className="myprop-card">

              <div className="img-wrap">
                <img src={property.imageUrl} alt={property.title} />
              </div>

              <div className="myprop-info">
                <h4>{property.title}</h4>
                <p>{property.location}</p>
                <p className="price">₹ {property.rent}</p>
                <span
                  className={`status ${property.available ? "available" : "occupied"}`}
                >
                  {property.available ? "Available" : "Occupied"}
                </span>
              </div>

              <div className="myprop-actions">
                <button onClick={() => startEdit(property)}>Edit</button>
                <button className="danger" onClick={() => handleDelete(property.id)}>
                  Delete
                </button>
              </div>

              {editingId === property.id && (
                <div className="edit-box">

                  <img
                    src={
                      newImageFile
                        ? URL.createObjectURL(newImageFile)
                        : formData.imageUrl
                    }
                    alt="preview"
                    className="preview-img"
                  />

                  <input name="title" value={formData.title} onChange={handleChange} />
                  <input name="type" value={formData.type} onChange={handleChange} />
                  <input name="location" value={formData.location} onChange={handleChange} />
                  <input name="rent" type="number" value={formData.rent} onChange={handleChange} />
                  <input name="bedrooms" type="number" value={formData.bedrooms || ""} onChange={handleChange} />
                  <textarea name="amenities" value={formData.amenities || ""} onChange={handleChange} />

                  <input type="file" onChange={handleImageChange} />

                  <select name="available" value={formData.available} onChange={handleChange}>
                    <option value="true">Available</option>
                    <option value="false">Occupied</option>
                  </select>

                  <div className="edit-actions">
                    <button onClick={saveEdit} className="save">Save</button>
                    <button onClick={() => setEditingId(null)} className="cancel">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProperties;
