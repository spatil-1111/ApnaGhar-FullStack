import { useEffect, useState } from "react";
import {
  getMyNotifications,
  markNotificationRead,
  markAllRead,
} from "../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("UNREAD");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getMyNotifications();
      setNotifications(res.data.reverse());
    } catch (error) {
      console.error("Notification load failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (id) => {
    await markNotificationRead(id);
    fetchNotifications();
  };

  const handleMarkAll = async () => {
    await markAllRead();
    fetchNotifications();
  };

  const unreadList = notifications.filter((n) => !n.read);
  const allList = notifications;

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading notifications...</p>;
  }

  return (
    <div style={{ padding: "60px", maxWidth: "900px", margin: "auto" }}>
      <h2>Notifications</h2>

      {/* TABS */}
      <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
        <TabButton
          label={`Unread (${unreadList.length})`}
          active={activeTab === "UNREAD"}
          onClick={() => setActiveTab("UNREAD")}
        />
        <TabButton
          label="All"
          active={activeTab === "ALL"}
          onClick={() => setActiveTab("ALL")}
        />

        <button
          onClick={handleMarkAll}
          style={{
            marginLeft: "auto",
            padding: "8px 14px",
            background: "#328cc1",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Mark All Read
        </button>
      </div>

      {/* LIST */}
      {(activeTab === "UNREAD" ? unreadList : allList).length === 0 && (
        <p style={{ marginTop: "30px" }}>No notifications</p>
      )}

      {(activeTab === "UNREAD" ? unreadList : allList).map((n) => (
        <div
          key={n.id}
          onClick={() => handleRead(n.id)}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginTop: "16px",
            backgroundColor: n.read ? "#fff" : "#f0f8ff",
            cursor: "pointer",
          }}
        >
          <p style={{ fontWeight: n.read ? "normal" : "bold" }}>{n.message}</p>
          <small style={{ color: "#666" }}>
            {new Date(n.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

/* ---------- UI COMPONENT ---------- */

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        border: "none",
        borderBottom: active ? "3px solid #328cc1" : "3px solid transparent",
        background: "transparent",
        cursor: "pointer",
        fontWeight: active ? "bold" : "normal",
      }}
    >
      {label}
    </button>
  );
}

export default Notifications;
