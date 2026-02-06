import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirm) {
      setError("All fields are required");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register({ name, email, phone, password });
      navigate("/home", { replace: true });
    } catch (_) {
      setError("Signup failed");
    }
  };

  return (
    <div className="landing-pastel">
      {/* Top pill-style header (same as landing/login) */}
      <div className="landing-topbar" aria-label="App Header">
        <div className="brand-left">
          <img className="brand-logo" src="/icons/applogo-removebg-preview.png" alt="PingMe logo" />
          <div className="pill-title">PingMe</div>
        </div>
        <div className="topbar-right" aria-label="Header Actions">
          <button className="topbar-icon" aria-label="Toggle Theme" onClick={() => setIsDark(!isDark)}>
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path d="M12 4v2M12 18v2M4 12h2M18 12h2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3.5" stroke="#6B7280" strokeWidth="1.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path d="M20 12.23A8 8 0 1 1 11.77 4 6.5 6.5 0 0 0 20 12.23Z" stroke="#374151" strokeWidth="1.5" />
              </svg>
            )}
          </button>
          <button className="topbar-icon" aria-label="Help & Support" title="Help & Support">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M12 18h.01M9.09 9a3 3 0 0 1 5.82 1c0 1.5-1.5 2.25-2.25 3" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="8" stroke="#9CA3AF" strokeWidth="1.2" />
            </svg>
          </button>
          <button className="topbar-btn topbar-btn--ghost" onClick={() => navigate("/login")}>Login</button>
          <button className="topbar-btn topbar-btn--primary" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </div>

      {/* Centered signup card with same theme as login */}
      <div className="login-card card-animate" role="form" aria-labelledby="signup-title">
        <div className="login-header">
          <div id="signup-title" className="login-title">Create your PingMe account</div>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="login-label" htmlFor="name">Full Name</label>
          <div className="login-input">
            <input id="name" type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <label className="login-label" htmlFor="email">Email</label>
          <div className="login-input">
            <span className="login-icon" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M4 7.5a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z" stroke="#9CA3AF" strokeWidth="1.2" />
                <path d="M5 8l7 4 7-4" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </span>
            <input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <label className="login-label" htmlFor="phone">Phone</label>
          <div className="login-input">
            <input id="phone" type="tel" placeholder="Enter your phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="login-row">
            <label className="login-label" htmlFor="password">Password</label>
          </div>
          <div className="login-input">
            <span className="login-icon" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M7 10v-2a5 5 0 0 1 10 0v2" stroke="#9CA3AF" strokeWidth="1.2" />
                <rect x="5" y="10" width="14" height="9" rx="2" stroke="#6B7280" strokeWidth="1.2" />
              </svg>
            </span>
            <input id="password" type={showPassword ? "text" : "password"} placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="visibility-toggle" aria-label="Toggle visibility" onClick={() => setShowPassword(v => !v)}>
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" stroke="#6B7280" strokeWidth="1.3" />
                  <circle cx="12" cy="12" r="3.5" stroke="#9CA3AF" strokeWidth="1.3" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" stroke="#6B7280" strokeWidth="1.3" />
                  <path d="M4 4l16 16" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          <label className="login-label" htmlFor="confirm">Confirm Password</label>
          <div className="login-input">
            <input id="confirm" type={showPassword ? "text" : "password"} placeholder="Confirm your password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>

          {error && (
            <div className="login-error" role="alert">{error}</div>
          )}

          <button className="login-btn" type="submit">Create Account</button>

          <div className="login-card-footer">
            <span>Already have an account? </span>
            <button type="button" className="signup-link" onClick={() => navigate("/login")}>Login</button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="landing-footer">
        <Footer />
      </div>
    </div>
  );
}
