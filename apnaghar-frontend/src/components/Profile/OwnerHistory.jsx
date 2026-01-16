import { useEffect, useState } from "react";
import api from "../../services/api";

function OwnerHistory() {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/bookings/owner"),
      api.get("/payments/owner"),
    ])
      .then(([bRes, pRes]) => {
        setBookings(bRes.data);
        setPayments(pRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Owner history load failed", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading owner history...</p>;

  if (bookings.length === 0) return <p>No history available.</p>;

  return (
    <div>
      <h3>📜 Property Booking & Earnings History</h3>

      {bookings.map((b) => {
        const payment = payments.find(
          (p) => p.booking.id === b.id
        );

        return (
          <div
            key={b.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "16px",
              background: "#fafafa",
            }}
          >
            <h4>{b.property.title}</h4>
            <p><b>User:</b> {b.user.name}</p>

            <TimelineItem
              label="Booking Requested"
              date={b.bookingDate}
              color="orange"
            />

            {b.status === "CONFIRMED" && (
              <TimelineItem
                label="Booking Confirmed"
                date={b.bookingDate}
                color="green"
              />
            )}

            {payment && (
              <TimelineItem
                label="Payment Received"
                date={payment.paymentDate}
                color="#328cc1"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function TimelineItem({ label, date, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: color,
          marginRight: "10px",
        }}
      />
      <p style={{ margin: 0 }}>
        <b>{label}</b> — {new Date(date).toLocaleDateString()}
      </p>
    </div>
  );
}

export default OwnerHistory;
