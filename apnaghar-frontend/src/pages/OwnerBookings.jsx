import { useEffect, useState } from "react";
import api from "../services/api";
import "./OwnerBookings.css";

function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    setLoading(true);
    api.get("/bookings/owner")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching owner bookings", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const total = bookings.length;
  const pending = bookings.filter(b => b.status === "PENDING").length;
  const confirmed = bookings.filter(b => b.status === "CONFIRMED").length;
  const cancelled = bookings.filter(b => b.status === "CANCELLED").length;

  const updateStatus = (bookingId, status) => {
    api.put(`/bookings/${bookingId}/status?status=${status}`)
      .then(() => {
        alert(`Booking ${status}`);
        fetchBookings();
      })
      .catch((err) => {
        console.error("Update failed", err);
        alert("Failed to update booking");
      });
  };

  if (loading) {
    return <p className="owner-loading">Loading bookings...</p>;
  }

  return (
    <div className="owner-booking-page">
      <h2>Property Bookings</h2>

      {/* STATS */}
      <div className="owner-stats">
        <StatCard label="Total" value={total} color="#0b3c5d" />
        <StatCard label="Pending" value={pending} color="#f59e0b" />
        <StatCard label="Confirmed" value={confirmed} color="#16a34a" />
        <StatCard label="Cancelled" value={cancelled} color="#ef4444" />
      </div>

      {/* BOOKINGS */}
      {bookings.length === 0 ? (
        <p className="owner-empty">No bookings yet.</p>
      ) : (
        <div className="owner-booking-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="owner-booking-card">
              <div className="owner-booking-header">
                Booking #{booking.id}
                <span className={`status ${booking.status.toLowerCase()}`}>
                  {booking.status}
                </span>
              </div>

              <div className="owner-booking-body">
                <p><strong>User:</strong> {booking.user?.name}</p>
                <p><strong>Start:</strong> {booking.startDate || "N/A"}</p>
                <p><strong>End:</strong> {booking.endDate || "N/A"}</p>

                {booking.status === "PENDING" && (
                  <div className="owner-actions">
                    <button
                      className="confirm-btn"
                      onClick={() => updateStatus(booking.id, "CONFIRMED")}
                    >
                      Confirm
                    </button>

                    <button
                      className="cancel-btn"
                      onClick={() => updateStatus(booking.id, "CANCELLED")}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- STAT CARD ---------- */

function StatCard({ label, value, color }) {
  return (
    <div className="stat-card">
      <h3 style={{ color }}>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

export default OwnerBookings;
