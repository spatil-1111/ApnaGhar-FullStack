import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const location = useLocation();

  // ❌ Hide footer on auth pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-col">
          <h3 className="footer-logo">
            Apna<span>Ghar</span>
          </h3>
          <p className="footer-text">
            Find trusted PGs, Hostels and Flats easily with ApnaGhar.
            Your comfort, our priority.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/notifications">Notifications</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p>Pune, Maharashtra</p>
          <p>Email: support@apnaghar.com</p>
          <p>Mon – Sat | 9AM – 7PM</p>
        </div>

        {/* SOCIAL */}
        <div className="footer-col">
          <h4>Follow Me</h4>
          <div className="social-links">
            <a href="#" title="GitHub">🐙</a>
            <a href="#" title="LinkedIn">💼</a>
            <a href="#" title="Instagram">📸</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ApnaGhar. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
