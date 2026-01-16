import { useState } from "react";
import { getUser } from "../utils/auth";

// 🔁 Reuse existing pages
import Bookings from "./Bookings";
import OwnerBookings from "./OwnerBookings";
import MyProperties from "../components/Profile/MyProperties";
import OwnerEarnings from "../components/Profile/OwnerEarnings";
import UserPayments from "../components/Profile/UserPayments";
import UserHistory from "../components/Profile/UserHistory";
import OwnerDashboard from "../components/Profile/OwnerDashboard"; // ✅ DASHBOARD
import OwnerHistory from "../components/Profile/OwnerHistory";

function Profile() {
  const user = getUser();

  // ✅ DEFAULT TAB FIX
  const [activeTab, setActiveTab] = useState(
    user?.role === "OWNER" ? "OWNER_DASHBOARD" : "DEFAULT"
  );

  if (!user) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        <h2>Please login to view your profile</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "60px", maxWidth: "1200px", margin: "auto" }}>
      {/* PROFILE HEADER */}
      <div style={{ marginBottom: "32px" }}>
        <h2>My Profile</h2>
        <p style={{ color: "#666" }}>
          {user.name} ({user.role})
        </p>
      </div>

      {/* PROFILE TABS */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        {user.role === "USER" && (
          <>
            <TabButton
              label="My Bookings"
              active={activeTab === "USER_BOOKINGS"}
              onClick={() => setActiveTab("USER_BOOKINGS")}
            />
            <TabButton
              label="Payments"
              active={activeTab === "USER_PAYMENTS"}
              onClick={() => setActiveTab("USER_PAYMENTS")}
            />
            <TabButton
              label="History"
              active={activeTab === "USER_HISTORY"}
              onClick={() => setActiveTab("USER_HISTORY")}
            />
          </>
        )}

        {user.role === "OWNER" && (
          <>
            {/* ✅ DASHBOARD TAB ADDED */}
            <TabButton
              label="Dashboard"
              active={activeTab === "OWNER_DASHBOARD"}
              onClick={() => setActiveTab("OWNER_DASHBOARD")}
            />

            <TabButton
              label="My Properties"
              active={activeTab === "OWNER_PROPERTIES"}
              onClick={() => setActiveTab("OWNER_PROPERTIES")}
            />
            <TabButton
              label="My Bookings"
              active={activeTab === "OWNER_BOOKINGS"}
              onClick={() => setActiveTab("OWNER_BOOKINGS")}
            />
            <TabButton
              label="Earnings"
              active={activeTab === "OWNER_EARNINGS"}
              onClick={() => setActiveTab("OWNER_EARNINGS")}
            />
            <TabButton
              label="History"
              active={activeTab === "OWNER_HISTORY"}
              onClick={() => setActiveTab("OWNER_HISTORY")}
            />
          </>
        )}
      </div>

      {/* PROFILE CONTENT */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "24px",
          backgroundColor: "#fff",
          minHeight: "300px",
        }}
      >
        {/* USER CONTENT */}
        {activeTab === "USER_BOOKINGS" && <Bookings />}
        {activeTab === "USER_PAYMENTS" && <UserPayments />}
        {activeTab === "USER_HISTORY" && <UserHistory />}

        {/* OWNER CONTENT */}
        {activeTab === "OWNER_DASHBOARD" && <OwnerDashboard />} {/* ✅ SHOW DASHBOARD */}
        {activeTab === "OWNER_PROPERTIES" && <MyProperties />}
        {activeTab === "OWNER_BOOKINGS" && <OwnerBookings />}
        {activeTab === "OWNER_EARNINGS" && <OwnerEarnings />}

        {activeTab === "OWNER_HISTORY" && <OwnerHistory />}


        {activeTab === "DEFAULT" && (
          <p style={{ color: "#666" }}>
            Select an option from above to view details.
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------- Reusable UI Components ---------- */

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        border: "none",
        borderBottom: active ? "3px solid #328cc1" : "3px solid transparent",
        backgroundColor: "transparent",
        cursor: "pointer",
        fontWeight: active ? "bold" : "normal",
      }}
    >
      {label}
    </button>
  );
}

function Placeholder({ title, children }) {
  return (
    <div>
      <h3 style={{ marginBottom: "8px" }}>{title}</h3>
      <p style={{ color: "#555" }}>{children}</p>
    </div>
  );
}

export default Profile;
