import { useEffect, useState } from "react";
import {
  getMyBookings,
  cancelBookingByUser,
} from "../services/bookingService";
import { getMyPayments, payForBooking } from "../services/paymentService";
import "./Bookings.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleCancel = (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return;

    cancelBookingByUser(bookingId)
      .then(() => {
        alert("Booking cancelled successfully");
        loadMyBookings();
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Cancel failed");
      });
  };

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
    return <p className="booking-loading">Loading your bookings...</p>;
  }

  return (
    <div className="booking-page">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="booking-empty">
          <p>No bookings yet 😕</p>
          <span>Browse properties and book your stay.</span>
        </div>
      ) : (
        <div className="booking-grid">
          {bookings.map((booking) => {
            const payment = getPaymentForBooking(booking.id);

            return (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  Booking #{booking.id}
                  <span className={`status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="booking-body">
                  <p><strong>Start:</strong> {booking.startDate || "N/A"}</p>
                  <p><strong>End:</strong> {booking.endDate || "N/A"}</p>

                  {payment && (
                    <p>
                      <strong>Payment:</strong>{" "}
                      <span className={`pay ${payment.status.toLowerCase()}`}>
                        {payment.status}
                      </span>
                    </p>
                  )}

                  {payment &&
                    payment.status === "PENDING" &&
                    booking.status === "CONFIRMED" && (
                      <button
                        className="pay-btn"
                        onClick={() => handlePay(booking.id)}
                      >
                        Pay Now
                      </button>
                    )}

                  {payment && payment.status === "SUCCESS" && (
                    <p className="paid-text">Paid ✅</p>
                  )}

                  {booking.status === "PENDING" && (
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(booking.id)}
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

export default Bookings;
