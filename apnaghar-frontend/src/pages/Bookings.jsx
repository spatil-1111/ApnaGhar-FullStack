import { useEffect, useState } from "react";
import {
  getMyBookings,
  cancelBookingByUser,
} from "../services/bookingService";
import { getMyPayments, payForBooking } from "../services/paymentService";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Load bookings + payments
  const loadMyBookings = async () => {
    setLoading(true);
    try {
      const bookingRes = await getMyBookings();
      const paymentRes = await getMyPayments();

      setBookings(bookingRes.data);
      setPayments(paymentRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyBookings();
  }, []);

  // ❌ Cancel booking (USER)
  const handleCancel = (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    cancelBookingByUser(bookingId)
      .then(() => {
        alert("Booking cancelled successfully");
        loadMyBookings();
      })
      .catch((error) => {
        alert(
          error.response?.data?.message ||
          "You cannot cancel this booking"
        );
      });
  };

  // 💳 Pay Now
  const handlePay = async (bookingId) => {
    try {
      await payForBooking(bookingId);
      alert("Payment successful!");
      loadMyBookings();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  const getPaymentForBooking = (bookingId) => {
    return payments.find((p) => p.booking.id === bookingId);
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <h2>My Bookings</h2>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "24px" }}>My Bookings</h2>

      {bookings.length === 0 ? (
        <div style={emptyBoxStyle}>
          <p style={{ fontSize: "16px", color: "#555" }}>
            You have not made any bookings yet.
          </p>
          <p style={{ color: "#888" }}>
            Browse properties and book your stay.
          </p>
        </div>
      ) : (
        <div style={gridStyle}>
          {bookings.map((booking) => {
            const payment = getPaymentForBooking(booking.id);

            return (
              <div key={booking.id} style={cardStyle}>
                <div style={cardHeaderStyle}>
                  Booking #{booking.id}
                </div>

                <div style={cardBodyStyle}>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span style={{ color: statusColor(booking.status) }}>
                      {booking.status}
                    </span>
                  </p>

                  <p>
                    <strong>Start Date:</strong>{" "}
                    {booking.startDate || "N/A"}
                  </p>

                  <p>
                    <strong>End Date:</strong>{" "}
                    {booking.endDate || "N/A"}
                  </p>

                  {/* 💳 PAYMENT SECTION */}
                  {payment && (
                    <p>
                      <strong>Payment:</strong>{" "}
                      <span style={{ color: paymentColor(payment.status) }}>
                        {payment.status}
                      </span>
                    </p>
                  )}

                  {/* 💳 PAY NOW */}
                  {payment &&
                    payment.status === "PENDING" &&
                    booking.status === "CONFIRMED" && (
                      <button
                        onClick={() => handlePay(booking.id)}
                        style={payBtnStyle}
                      >
                        Pay Now
                      </button>
                    )}

                  {/* ✅ PAID */}
                  {payment && payment.status === "SUCCESS" && (
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      Paid ✅
                    </p>
                  )}

                  {/* ❌ Cancel only if pending booking */}
                  {booking.status === "PENDING" && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      style={cancelBtnStyle}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------- Styles ---------- */

const containerStyle = {
  padding: "60px",
  maxWidth: "900px",
  margin: "auto",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  overflow: "hidden",
};

const cardHeaderStyle = {
  backgroundColor: "#328cc1",
  color: "#ffffff",
  padding: "12px",
  fontWeight: "bold",
};

const cardBodyStyle = {
  padding: "16px",
  color: "#333",
};

const emptyBoxStyle = {
  border: "1px dashed #ccc",
  padding: "40px",
  textAlign: "center",
  borderRadius: "8px",
  backgroundColor: "#fafafa",
};

const cancelBtnStyle = {
  marginTop: "12px",
  backgroundColor: "red",
  color: "white",
  padding: "8px 14px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const payBtnStyle = {
  marginTop: "12px",
  backgroundColor: "green",
  color: "white",
  padding: "8px 14px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

// ✅ booking status colors
const statusColor = (status) => {
  if (status === "CONFIRMED") return "green";
  if (status === "CANCELLED") return "red";
  if (status === "PENDING") return "orange";
  return "#333";
};

// ✅ payment status colors
const paymentColor = (status) => {
  if (status === "SUCCESS") return "green";
  if (status === "FAILED") return "red";
  if (status === "PENDING") return "orange";
  return "#333";
};

export default Bookings;
