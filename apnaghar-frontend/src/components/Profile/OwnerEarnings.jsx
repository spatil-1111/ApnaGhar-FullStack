import { useEffect, useState } from "react";
import api from "../../services/api";

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
    return <p>Loading earnings...</p>;
  }

  const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);

  const currentMonth = new Date().getMonth();
  const monthlyEarnings = payments.filter(p =>
    new Date(p.paymentDate).getMonth() === currentMonth
  ).reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h3>💰 Earnings Overview</h3>

      {/* SUMMARY CARDS */}
      <div style={{ display: "flex", gap: "16px", margin: "20px 0" }}>
        <StatCard label="Total Earnings" value={`₹ ${totalEarnings}`} />
        <StatCard label="This Month" value={`₹ ${monthlyEarnings}`} />
        <StatCard label="Payments" value={payments.length} />
      </div>

      {/* PAYMENT LIST */}
      {payments.length === 0 ? (
        <p>No earnings yet.</p>
      ) : (
        payments.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              padding: "14px",
              borderRadius: "6px",
              marginBottom: "10px",
            }}
          >
            <p><b>Amount:</b> ₹ {p.amount}</p>
            <p><b>Property:</b> {p.booking.property.title}</p>
            <p><b>User:</b> {p.booking.user.name}</p>
            <small>
              {new Date(p.paymentDate).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "8px",
        background: "#f8f9fa",
        minWidth: "140px",
        textAlign: "center",
      }}
    >
      <h4>{value}</h4>
      <p style={{ color: "#666" }}>{label}</p>
    </div>
  );
}

export default OwnerEarnings;
