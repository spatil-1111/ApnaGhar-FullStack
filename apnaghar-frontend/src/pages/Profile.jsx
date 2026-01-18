import { useState } from "react";
import { getUser } from "../utils/auth";

/* PAGES */
import Bookings from "./Bookings";
import OwnerBookings from "./OwnerBookings";

/* COMPONENTS */
import MyProperties from "../components/Profile/MyProperties";
import OwnerEarnings from "../components/Profile/OwnerEarnings";
import UserPayments from "../components/Profile/UserPayments";
import UserHistory from "../components/Profile/UserHistory";
import OwnerDashboard from "../components/Profile/OwnerDashboard";
import OwnerHistory from "../components/Profile/OwnerHistory";

import "./Profile.css";

function Profile() {
  const user = getUser();

  const [activeTab, setActiveTab] = useState(
    user?.role === "OWNER" ? "OWNER_DASHBOARD" : "USER_BOOKINGS"
  );

  if (!user) {
    return (
      <div style={{ padding: "80px", textAlign: "center" }}>
        <h2>Please login to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* SIDEBAR */}
      <aside className="profile-sidebar">
        <div className="profile-header">
          <div className="avatar-circle">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <p className="profile-user">
            {user.name}
            <br />
            <span>{user.role}</span>
          </p>
        </div>

        <div className="sidebar-links">
          {user.role === "USER" && (
            <>
              <SideBtn
                label="My Bookings"
                active={activeTab === "USER_BOOKINGS"}
                onClick={() => setActiveTab("USER_BOOKINGS")}
              />
              <SideBtn
                label="Payments"
                active={activeTab === "USER_PAYMENTS"}
                onClick={() => setActiveTab("USER_PAYMENTS")}
              />
              <SideBtn
                label="History"
                active={activeTab === "USER_HISTORY"}
                onClick={() => setActiveTab("USER_HISTORY")}
              />
            </>
          )}

          {user.role === "OWNER" && (
            <>
              <SideBtn
                label="Dashboard"
                active={activeTab === "OWNER_DASHBOARD"}
                onClick={() => setActiveTab("OWNER_DASHBOARD")}
              />
              <SideBtn
                label="My Properties"
                active={activeTab === "OWNER_PROPERTIES"}
                onClick={() => setActiveTab("OWNER_PROPERTIES")}
              />
              <SideBtn
                label="Bookings"
                active={activeTab === "OWNER_BOOKINGS"}
                onClick={() => setActiveTab("OWNER_BOOKINGS")}
              />
              <SideBtn
                label="Earnings"
                active={activeTab === "OWNER_EARNINGS"}
                onClick={() => setActiveTab("OWNER_EARNINGS")}
              />
              <SideBtn
                label="History"
                active={activeTab === "OWNER_HISTORY"}
                onClick={() => setActiveTab("OWNER_HISTORY")}
              />
            </>
          )}
        </div>
      </aside>

      {/* CONTENT */}
      <main className="profile-content">
        {activeTab === "USER_BOOKINGS" && <Bookings />}
        {activeTab === "USER_PAYMENTS" && <UserPayments />}
        {activeTab === "USER_HISTORY" && <UserHistory />}

        {activeTab === "OWNER_DASHBOARD" && <OwnerDashboard />}
        {activeTab === "OWNER_PROPERTIES" && <MyProperties />}
        {activeTab === "OWNER_BOOKINGS" && <OwnerBookings />}
        {activeTab === "OWNER_EARNINGS" && <OwnerEarnings />}
        {activeTab === "OWNER_HISTORY" && <OwnerHistory />}
      </main>
    </div>
  );
}

/* SIDEBAR BUTTON */

function SideBtn({ label, active, onClick }) {
  return (
    <button
      className={`side-btn ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Profile;
