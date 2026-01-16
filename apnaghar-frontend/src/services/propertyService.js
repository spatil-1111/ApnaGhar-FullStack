import api from "./api";

// Get paginated properties
export const getAllProperties = (page = 0, size = 5) => {
  return api.get(`/properties?page=${page}&size=${size}`);
};

// Get single property by ID
export const getPropertyById = (id) => {
  return api.get(`/properties/${id}`);
};

// Search by location
export const searchByLocation = (location) => {
  return api.get(`/properties/search/location?location=${location}`);
};

// Search by type
export const searchByType = (type) => {
  return api.get(`/properties/search/type?type=${type}`);
};

// Search by location + type
export const searchByLocationAndType = (location, type) => {
  return api.get(`/properties/search?location=${location}&type=${type}`);
};

// Add new property (OWNER)
export const addProperty = (property, ownerEmail) => {
  return api.post(`/properties?ownerEmail=${ownerEmail}`, property);
};
