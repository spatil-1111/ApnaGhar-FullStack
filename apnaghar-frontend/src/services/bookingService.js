import api from "./api";

// Get bookings of logged-in user
export const getMyBookings = () => {
  return api.get("/bookings/my");
};

// Create booking for a property
// Create booking with dates
export const createBooking = (propertyId, bookingData) => {
  return api.post(`/bookings?propertyId=${propertyId}`, bookingData);
};

export const cancelBookingByUser = (bookingId) => {
  return api.put(`/bookings/cancel/${bookingId}`);
};


