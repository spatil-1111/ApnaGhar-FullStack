import { useEffect, useState } from "react";
import api from "../../services/api";

function UserPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/payments/my")
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Payment load failed", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading your payments...</p>;
  }

  return (
    <div>
      <h3>💳 My Payments</h3>

      {payments.length === 0 ? (
        <p>No payments done yet.</p>
      ) : (
        payments.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              padding: "14px",
              borderRadius: "8px",
              marginBottom: "12px",
              background: "#fafafa",
            }}
          >
            <p><b>Amount:</b> ₹ {p.amount}</p>
            <p><b>Property:</b> {p.booking.property.title}</p>
            <p><b>Status:</b> {p.status}</p>
            <small>
              {new Date(p.paymentDate).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default UserPayments;
