import { useEffect, useState } from "react";
import {
  getMyNotifications,
  markNotificationRead,
  markAllRead,
} from "../services/notificationService";
import "./Notifications.css";

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
    try {
      await markNotificationRead(id);
      fetchNotifications();
    } catch (e) {
      console.error("Mark read failed", e);
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllRead();
      fetchNotifications();
    } catch (e) {
      console.error("Mark all failed", e);
    }
  };

  const unreadList = notifications.filter((n) => !n.read);
  const allList = notifications;

  if (loading) {
    return <p className="notify-loading">Loading notifications...</p>;
  }

  const listToShow = activeTab === "UNREAD" ? unreadList : allList;

  return (
    <div className="notify-page">
      <h2>🔔 Notifications</h2>

      {/* TABS */}
      <div className="notify-tabs">
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

        <button className="mark-all-btn" onClick={handleMarkAll}>
          Mark All Read
        </button>
      </div>

      {/* EMPTY STATE */}
      {listToShow.length === 0 && (
        <div className="notify-empty">
          <p>No notifications here 😴</p>
        </div>
      )}

      {/* LIST */}
      <div className="notify-list">
        {listToShow.map((n) => (
          <div
            key={n.id}
            className={`notify-card ${n.read ? "read" : "unread"}`}
          >
            <div className="notify-icon">
              {getIcon(n.message)}
            </div>

            <div className="notify-content">
              <p className="notify-msg">{n.message}</p>
              <span className="notify-time">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </div>

            {!n.read && (
              <button
                className="read-btn"
                onClick={() => handleRead(n.id)}
              >
                Mark Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- TAB BUTTON ---------- */
function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`notify-tab ${active ? "active" : ""}`}
    >
      {label}
    </button>
  );
}

/* ---------- ICON LOGIC ---------- */
function getIcon(msg) {
  const text = msg.toLowerCase();

  if (text.includes("booking")) return "🏠";
  if (text.includes("payment")) return "💳";
  if (text.includes("approved") || text.includes("confirmed")) return "✅";
  if (text.includes("cancel")) return "❌";

  return "🔔";
}

export default Notifications;
