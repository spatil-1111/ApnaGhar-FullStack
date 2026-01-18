import { useEffect, useState } from "react";
import api from "../../services/api";
import "./UserHistory.css";

function UserHistory() {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/bookings/my"),
      api.get("/payments/my"),
    ])
      .then(([bRes, pRes]) => {
        setBookings(bRes.data);
        setPayments(pRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("History load failed", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading history...</p>;

  return (
    <div className="history-page">
      <h3>📜 Booking & Payment History</h3>

      {bookings.length === 0 ? (
        <div className="empty-box">No history available.</div>
      ) : (
        <div className="history-list">
          {bookings.map((b) => {
            const payment = payments.find(
              (p) => p.booking.id === b.id
            );

            return (
              <div key={b.id} className="history-card">
                <h4>{b.property.title}</h4>

                <div className="timeline">
                  <TimelineItem
                    label="Booked"
                    date={b.bookingDate}
                    color="orange"
                  />

                  {b.status === "CONFIRMED" && (
                    <TimelineItem
                      label="Confirmed"
                      date={b.bookingDate}
                      color="green"
                    />
                  )}

                  {payment && (
                    <TimelineItem
                      label="Payment"
                      date={payment.paymentDate}
                      color="#328cc1"
                    />
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

function TimelineItem({ label, date, color }) {
  return (
    <div className="timeline-item">
      <span className="dot" style={{ background: color }} />
      <p>
        <b>{label}</b> — {new Date(date).toLocaleDateString()}
      </p>
    </div>
  );
}

export default UserHistory;
