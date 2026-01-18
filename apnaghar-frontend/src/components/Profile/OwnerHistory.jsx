import { useEffect, useState } from "react";
import api from "../../services/api";
import "./OwnerHistory.css";

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

  if (loading) return <p className="hist-loading">Loading owner history...</p>;

  if (bookings.length === 0)
    return <p className="hist-empty">No history available.</p>;

  return (
    <div className="owner-history-page">
      <h3>📜 Booking & Payment History</h3>

      <div className="history-list">
        {bookings.map((b) => {
          const payment = payments.find((p) => p.booking.id === b.id);

          return (
            <div key={b.id} className="history-card">
              {/* HEADER */}
              <div className="history-head">
                <div>
                  <h4>{b.property.title}</h4>
                  <p>User: {b.user.name}</p>
                </div>

                <span className={`status ${b.status.toLowerCase()}`}>
                  {b.status}
                </span>
              </div>

              {/* TIMELINE */}
              <div className="timeline">
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
                    color="blue"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineItem({ label, date, color }) {
  return (
    <div className="timeline-item">
      <span className={`dot ${color}`} />
      <div>
        <p className="t-label">{label}</p>
        <p className="t-date">{new Date(date).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default OwnerHistory;
