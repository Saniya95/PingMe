import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Footer from "../components/Footer.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error: authError, clearError } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
    setError("");
  }, [clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    clearError();
    
    // Frontend validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    
    // Basic email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('🔑 Submitting login form...', { email });
      
      await login({ email, password });
      
      console.log('✅ Login completed, redirecting to home...');
      navigate("/home", { replace: true });
    } catch (err) {
      console.error('❌ Login failed:', err.message);
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-pastel">
      {/* Top pill-style header (same as landing) */}
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

      {/* Centered login card */}
      <div className="login-card card-animate" role="form" aria-labelledby="login-title">
        <div className="login-header">
          <div id="login-title" className="login-title">Login to PingMe</div>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <label className="login-label" htmlFor="email">Email Address</label>
          <div className="login-input">
            <span className="login-icon" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M4 7.5a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z" stroke="#9CA3AF" strokeWidth="1.2" />
                <path d="M5 8l7 4 7-4" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </span>
            <input 
              id="email" 
              type="email" 
              placeholder="Enter your email address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting || loading}
            />
          </div>

          {/* Password field */}
          <div className="login-row">
            <label className="login-label" htmlFor="password">Password</label>
            <button type="button" className="forgot-link" aria-label="Forgot Password?" disabled={isSubmitting || loading}>Forgot Password?</button>
          </div>
          <div className="login-input">
            <span className="login-icon" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M7 10v-2a5 5 0 0 1 10 0v2" stroke="#9CA3AF" strokeWidth="1.2" />
                <rect x="5" y="10" width="14" height="9" rx="2" stroke="#6B7280" strokeWidth="1.2" />
              </svg>
            </span>
            <input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting || loading}
            />
            <button type="button" className="visibility-toggle" aria-label="Toggle visibility" onClick={() => setShowPassword(v => !v)} disabled={isSubmitting || loading}>
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

          {(error || authError) && (
            <div className="login-error" role="alert">
              {error || authError}
            </div>
          )}
          
          {/* Login CTA */}
          <button 
            className="login-btn" 
            type="submit"
            disabled={isSubmitting || loading || !email || !password}
          >
            {isSubmitting || loading ? (
              <>
                <span className="loading-spinner" aria-hidden>⟳</span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Card footer text */}
          <div className="login-card-footer">
            <span>Don’t have an account? </span>
            <button type="button" className="signup-link" onClick={() => navigate("/signup")}>Sign up</button>
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
