import { useEffect, useState } from "react";
import api from "../../services/api";

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

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (!data) {
    return <p>No dashboard data</p>;
  }

  return (
    <div>
      <h3 style={{ marginBottom: "24px" }}>📊 Owner Dashboard</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        <DashboardCard
          title="Total Properties"
          value={data.totalProperties}
          color="#0b3c5d"
        />

        <DashboardCard
          title="Active Properties"
          value={data.activeProperties}
          color="green"
        />

        <DashboardCard
          title="Total Bookings"
          value={data.totalBookings}
          color="#328cc1"
        />

        <DashboardCard
          title="Total Earnings"
          value={`₹ ${data.totalEarnings}`}
          color="orange"
        />
      </div>
    </div>
  );
}

/* ---------- Card Component ---------- */

function DashboardCard({ title, value, color }) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        background: "#ffffff",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "8px", color }}>{value}</h2>
      <p style={{ color: "#555" }}>{title}</p>
    </div>
  );
}

export default OwnerDashboard;
