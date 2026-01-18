import { useEffect, useState } from "react";
import api from "../../services/api";
import "./UserPayments.css";

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
    <div className="payments-page">
      <h3>💳 My Payments</h3>

      {payments.length === 0 ? (
        <div className="empty-box">
          <p>No payments done yet.</p>
        </div>
      ) : (
        <div className="payments-grid">
          {payments.map((p) => (
            <div key={p.id} className="payment-card">
              <div className="pay-header">
                <span className={`status ${p.status.toLowerCase()}`}>
                  {p.status}
                </span>
              </div>

              <h4>₹ {p.amount}</h4>

              <p className="prop-name">
                {p.booking?.property?.title}
              </p>

              <small className="date">
                {new Date(p.paymentDate).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPayments;
