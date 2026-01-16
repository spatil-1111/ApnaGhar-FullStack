import api from "./api";

export const getRatingSummary = (propertyId) => {
  return api.get(`/reviews/property/${propertyId}/summary`);
};

export const getReviewsByProperty = (propertyId) => {
  return api.get(`/reviews/property/${propertyId}`);
};

export const addReview = (data) => {
  return api.post("/reviews", null, { params: data });
};
