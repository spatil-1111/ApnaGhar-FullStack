import { useEffect, useState } from "react";
import api from "../../services/api";
import "./OwnerDashboard.css";

function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/owner/dashboard")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard load failed", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="dash-loading">Loading dashboard...</p>;
  if (!data) return <p>No dashboard data</p>;

  return (
    <div className="owner-dashboard">
      <h3>📊 Owner Dashboard</h3>

      <div className="dash-grid">

        <DashboardCard
          title="Active Properties"
          value={data.activeProperties}
          icon="✅"
          color="green"
        />

        <DashboardCard
          title="Total Bookings"
          value={data.totalBookings}
          icon="📦"
          color="#7c3aed"
        />

        <DashboardCard
          title="Total Earnings"
          value={`₹ ${data.totalEarnings}`}
          icon="💰"
          color="#f97316"
        />

        <DashboardCard
          title="This Month"
          value={`₹ ${data.monthlyEarnings}`}
          icon="📅"
          color="#2563eb"
        />

      </div>
    </div>
  );
}

/* ---------- CARD ---------- */

function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="dash-card" style={{ background: color }}>
      <div className="dash-icon">{icon}</div>
      <div>
        <h2>{value}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default OwnerDashboard;
