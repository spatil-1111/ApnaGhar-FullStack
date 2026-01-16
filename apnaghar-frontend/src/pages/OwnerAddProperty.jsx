import { useState } from "react";
import { uploadImage } from "../services/imageService";
import api from "../services/api";

function OwnerAddProperty({ onSuccess }) {
  const [property, setProperty] = useState({
    title: "",
    type: "",
    location: "",
    rent: "",
    bedrooms: "",
    amenities: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ownerEmail = localStorage.getItem("email");

    if (!ownerEmail) {
      alert("Owner email missing. Please login again.");
      return;
    }

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Upload image
      const imageRes = await uploadImage(imageFile);
      const imageUrl = imageRes.data;

      // 2️⃣ Create property
      await api.post(`/properties?ownerEmail=${ownerEmail}`, {
        ...property,
        rent: Number(property.rent),
        bedrooms: property.bedrooms ? Number(property.bedrooms) : null,
        available: true,
        imageUrl: imageUrl,
      });

      alert("Property added successfully");

      // ✅ VERY IMPORTANT – notify parent
      if (onSuccess) {
        onSuccess();
      }

      // Reset form
      setProperty({
        title: "",
        type: "",
        location: "",
        rent: "",
        bedrooms: "",
        amenities: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("ADD PROPERTY ERROR:", error);
      alert("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "60px", maxWidth: "600px", margin: "auto" }}>
      <h2>Add New Property</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={property.title}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="type"
          placeholder="Type (PG / FLAT / ROOM)"
          value={property.type}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="location"
          placeholder="Location"
          value={property.location}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="rent"
          type="number"
          placeholder="Rent"
          value={property.rent}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="bedrooms"
          type="number"
          placeholder="Bedrooms"
          value={property.bedrooms}
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="amenities"
          placeholder="Amenities"
          value={property.amenities}
          onChange={handleChange}
        />
        <br /><br />

        <input type="file" onChange={handleImageChange} />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Property"}
        </button>
      </form>
    </div>
  );
}

export default OwnerAddProperty;
