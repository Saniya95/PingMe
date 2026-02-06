import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";

export default function Landing() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="landing-pastel">
      {/* Top pill-style header with logo and settings icon */}
      <div className="landing-topbar" aria-label="App Header">
        <div className="brand-left">
          <img className="brand-logo" src="/icons/applogo-removebg-preview.png" alt="PingMe logo" />
          <div className="pill-title">PingMe</div>
        </div>
        <div className="topbar-right" aria-label="Header Actions">
          {/* Theme toggle */}
          <button className="topbar-icon" aria-label="Toggle Theme" onClick={() => setIsDark(!isDark)}>
            {isDark ? (
              // Sun icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path d="M12 4v2M12 18v2M4 12h2M18 12h2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="3.5" stroke="#6B7280" strokeWidth="1.5"/>
              </svg>
            ) : (
              // Moon icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path d="M20 12.23A8 8 0 1 1 11.77 4 6.5 6.5 0 0 0 20 12.23Z" stroke="#374151" strokeWidth="1.5"/>
              </svg>
            )}
          </button>
          {/* Help */}
          <button className="topbar-icon" aria-label="Help & Support" title="Help & Support">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M12 18h.01M9.09 9a3 3 0 0 1 5.82 1c0 1.5-1.5 2.25-2.25 3" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="8" stroke="#9CA3AF" strokeWidth="1.2"/>
            </svg>
          </button>
          {/* Login (ghost) */}
          <button className="topbar-btn topbar-btn--ghost" onClick={() => navigate("/login")}>Login</button>
          {/* Sign Up (primary) */}
          <button className="topbar-btn topbar-btn--primary" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </div>

      {/* Centered frosted-glass card */}
      <div className="pastel-card" role="region" aria-labelledby="landing-title">
        <div style={{ textAlign: "center" }}>
          <div id="landing-title" className="pastel-title">Welcome to PingMe</div>
          <div className="pastel-sub">Sign in or create your account</div>
        </div>
        <div className="pastel-actions">
          <Link className="pastel-btn pastel-btn--primary" to="/login" aria-label="Login">Login</Link>
          <Link className="pastel-btn pastel-btn--secondary" to="/signup" aria-label="Sign Up">Sign Up</Link>
        </div>
      </div>

      {/* Footer anchored near bottom */}
      <div className="landing-footer">
        <Footer />
      </div>
    </div>
  );
}
