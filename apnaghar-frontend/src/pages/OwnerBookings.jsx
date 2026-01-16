import { useEffect, useState } from "react";
import api from "../services/api";

function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH FROM BACKEND
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

  // 📊 Stats
  const total = bookings.length;
  const pending = bookings.filter(b => b.status === "PENDING").length;
  const confirmed = bookings.filter(b => b.status === "CONFIRMED").length;
  const cancelled = bookings.filter(b => b.status === "CANCELLED").length;

  // ✅ UPDATE STATUS
  const updateStatus = (bookingId, status) => {
    api.put(`/bookings/${bookingId}/status?status=${status}`)
      .then(() => {
        alert(`Booking ${status}`);
        fetchBookings(); // 🔥 RELOAD FROM DB
      })
      .catch((err) => {
        console.error("Update failed", err);
        alert("Failed to update booking");
      });
  };

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading bookings...</p>;
  }

  return (
    <div style={{ padding: "60px", maxWidth: "900px", margin: "auto" }}>
      <h2>Owner – Property Bookings</h2>

      {/* 📊 Dashboard */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginTop: "24px",
          marginBottom: "32px",
        }}
      >
        <StatCard label="Total Bookings" value={total} color="#0b3c5d" />
        <StatCard label="Pending" value={pending} color="orange" />
        <StatCard label="Confirmed" value={confirmed} color="green" />
        <StatCard label="Cancelled" value={cancelled} color="red" />
      </div>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              marginTop: "16px",
              borderRadius: "6px",
              backgroundColor: "#fff",
            }}
          >
            <p><strong>Booking ID:</strong> {booking.id}</p>
            <p><strong>User:</strong> {booking.user?.name}</p>

            <BookingTimeline status={booking.status} />

            {booking.status === "PENDING" && (
              <>
                <button
                  onClick={() => updateStatus(booking.id, "CONFIRMED")}
                  style={btnConfirm}
                >
                  Confirm
                </button>

                <button
                  onClick={() => updateStatus(booking.id, "CANCELLED")}
                  style={btnCancel}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

/* ---------- STATUS TIMELINE ---------- */
function BookingTimeline({ status }) {
  const getColor = (step) => {
    if (step === status) return "#328cc1";
    if (status === "CANCELLED" && step === "CONFIRMED") return "#ccc";
    return "#ccc";
  };

  return (
    <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
      <TimelineStep label="PENDING" color={getColor("PENDING")} />
      <TimelineLine />
      <TimelineStep label="CONFIRMED" color={getColor("CONFIRMED")} />
      <TimelineLine />
      <TimelineStep label="CANCELLED" color={getColor("CANCELLED")} />
    </div>
  );
}

function TimelineStep({ label, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          backgroundColor: color,
          margin: "auto",
        }}
      />
      <small style={{ color, fontWeight: "bold" }}>{label}</small>
    </div>
  );
}

function TimelineLine() {
  return (
    <div
      style={{
        flex: 1,
        height: "2px",
        backgroundColor: "#ccc",
        margin: "0 6px",
      }}
    />
  );
}

/* ---------- Dashboard Card ---------- */
function StatCard({ label, value, color }) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "8px", color }}>{value}</h3>
      <p style={{ color: "#555" }}>{label}</p>
    </div>
  );
}

const btnConfirm = {
  marginRight: "10px",
  padding: "8px 14px",
  backgroundColor: "green",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const btnCancel = {
  padding: "8px 14px",
  backgroundColor: "red",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

export default OwnerBookings;
