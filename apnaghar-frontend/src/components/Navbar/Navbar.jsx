import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, logout } from "../../utils/auth";
import { getUnreadCount } from "../../services/notificationService";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const loggedInUser = getUser();
    setUser(loggedInUser);
  }, []);

  useEffect(() => {
    if (user) {
      fetchUnreadCount();
      const interval = setInterval(fetchUnreadCount, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const solidNavbar = !isHome || scrolled;

  return (
    <nav className={`navbar ${solidNavbar ? "navbar-solid" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          Apna<span>Ghar</span>
        </div>

        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/properties">Properties</Link></li>

          {user && (
            <>
              <li
                className="notification-icon"
                onClick={() => navigate("/notifications")}
              >
                🔔
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
              </li>

              <li><Link to="/profile">My Profile</Link></li>
            </>
          )}

          {!user && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li>
                <Link to="/register" className="nav-btn">Register</Link>
              </li>
            </>
          )}

          {user && (
            <>
              <li className="username">Hi, {user.name}</li>
              <li>
                <button onClick={handleLogout} className="nav-btn">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
