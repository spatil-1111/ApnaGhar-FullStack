import { useEffect, useState } from "react";
import api from "../../services/api";
import "./OwnerEarnings.css";

function OwnerEarnings() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/payments/owner")
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Owner payments load failed", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="earn-loading">Loading earnings...</p>;
  }

  const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);

  const currentMonth = new Date().getMonth();
  const monthlyEarnings = payments
    .filter((p) => new Date(p.paymentDate).getMonth() === currentMonth)
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="earn-page">
      <h3>💰 Earnings Overview</h3>

      {/* SUMMARY */}
      <div className="earn-summary">
        <StatCard label="Total Earnings" value={`₹ ${totalEarnings}`} color="blue" />
        <StatCard label="This Month" value={`₹ ${monthlyEarnings}`} color="green" />
        <StatCard label="Total Payments" value={payments.length} color="orange" />
      </div>

      {/* LIST */}
      {payments.length === 0 ? (
        <p className="earn-empty">No earnings yet.</p>
      ) : (
        <div className="earn-list">
          {payments.map((p) => (
            <div key={p.id} className="earn-card">
              <div>
                <h4>₹ {p.amount}</h4>
                <p className="prop-title">{p.booking.property.title}</p>
                <p className="user-name">User: {p.booking.user.name}</p>
              </div>

              <div className="earn-date">
                {new Date(p.paymentDate).toLocaleDateString()}
                <br />
                {new Date(p.paymentDate).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* STAT CARD */

function StatCard({ label, value, color }) {
  return (
    <div className={`earn-stat ${color}`}>
      <h2>{value}</h2>
      <p>{label}</p>
    </div>
  );
}

export default OwnerEarnings;
