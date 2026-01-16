import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, logout } from "../../utils/auth";
import { getUnreadCount } from "../../services/notificationService";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  // Load user
  useEffect(() => {
    const loggedInUser = getUser();
    setUser(loggedInUser);
  }, []);

  // Load unread count
  useEffect(() => {
    if (user) {
      fetchUnreadCount();

      const interval = setInterval(() => {
        fetchUnreadCount();
      }, 5000); // refresh every 5 sec

      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchUnreadCount = async () => {
    try {
      const res = await getUnreadCount();
      setUnreadCount(res.data);
    } catch (err) {
      console.error("Unread count error", err);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">ApnaGhar</div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/properties">Properties</Link></li>

        {user && (
          <>
            {/* 🔔 Notification Bell */}
            <li
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => navigate("/notifications")}
            >
              🔔
              {unreadCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-10px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </li>

            {/* 👤 MY PROFILE */}
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
          </>
        )}

        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register" className="nav-btn">Register</Link></li>
          </>
        )}

        {user && (
          <>
            <li style={{ color: "white" }}>
              Hi, {user.name}
            </li>
            <li>
              <button onClick={handleLogout} className="nav-btn">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
