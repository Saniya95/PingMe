import React, { useState, useEffect } from "react";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="landing-pastel">
      {/* Top pill-style header (same as login/signup) */}
      <div className="landing-topbar" aria-label="App Header">
        <div className="brand-left">
          <img className="brand-logo" src="/icons/applogo-removebg-preview.png" alt="PingMe logo" />
          <div className="pill-title">PingMe</div>
        </div>
        <div className="topbar-right" aria-label="Header Actions">
          {/* Theme toggle */}
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
          {/* Notifications */}
          <button className="topbar-icon" aria-label="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M12 4a5 5 0 0 1 5 5v3.5l1.3 1.3a1 1 0 0 1-.7 1.7H6.4a1 1 0 0 1-.7-1.7L7 12.5V9a5 5 0 0 1 5-5" stroke="#374151" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          {/* Avatar */}
          <div className="avatar-pill" aria-label="Profile" />
          {/* Logout */}
          <button className="topbar-btn topbar-btn--ghost" onClick={onLogout}>Logout</button>
        </div>
      </div>

      {/* Main body with footer pinned bottom */}
      <div className="home-container">
        <main className="home-main">
          {/* Welcome Section */}
          <section className="home-welcome">
            <h1 className="home-title">{`Welcome back, ${user?.name || "there"} 👋`}</h1>
            <p className="home-sub">Choose an AI workspace to start a conversation</p>
          </section>

          {/* Workspace Cards */}
          <div className="workspace-section">
            <section className="workspace-grid">
        {/* ChatGPT with provided PNG */}
        <button className="workspace-card">
          <img
            className="workspace-icon-img"
            src="/icons/ChatGPT%20Image%20Jan%2021,%202026,%2010_20_02%20PM.png"
            alt="ChatGPT"
          />
          <div className="workspace-title">ChatGPT</div>
          <div className="workspace-desc">Design feedback and prompts</div>
        </button>
        {/* Gemini with provided PNG (second image) */}
        <button className="workspace-card">
          <img
            className="workspace-icon-img"
            src="/icons/ChatGPT%20Image%20Jan%2021,%202026,%2010_17_08%20PM.png"
            alt="Gemini"
          />
          <div className="workspace-title">Gemini</div>
          <div className="workspace-desc">Brainstorming ideas</div>
        </button>
        {/* Placeholder cards to be updated later */}
        <button className="workspace-card">
          <div className="workspace-icon gradient-indigo" aria-hidden />
          <div className="workspace-title">Perplexity</div>
          <div className="workspace-desc">Ask anything and explore</div>
        </button>
        <button className="workspace-card">
          <div className="workspace-icon gradient-violet" aria-hidden />
          <div className="workspace-title">Grok</div>
          <div className="workspace-desc">Conversational AI</div>
        </button>
            </section>
          </div>
        </main>
        <Footer />
      </div>

      {/* Single footer handled by flex container above */}
    </div>
  );
}
