import api from "./api";

// ✅ Pay for booking
export const payForBooking = (bookingId) => {
  return api.put(`/payments/pay/${bookingId}`);
};

// ✅ Get my payments
export const getMyPayments = () => {
  return api.get("/payments/my");
};
