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
        {/* PingMe AI */}
        <button className="workspace-card" onClick={() => navigate('/chat/pingme')}>
          <img
            className="workspace-icon-img"
            src="/icons/ChatGPT%20Image%20Jan%2021,%202026,%2010_20_02%20PM.png"
            alt="PingMe AI"
          />
          <div className="workspace-title">PingMe AI</div>
          <div className="workspace-desc">Design feedback and prompts</div>
        </button>
        {/* Gemini */}
        <button className="workspace-card" onClick={() => navigate('/chat/gemini')}>
          <img
            className="workspace-icon-img"
            src="/icons/ChatGPT%20Image%20Jan%2021,%202026,%2010_17_08%20PM.png"
            alt="Gemini"
          />
          <div className="workspace-title">Gemini</div>
          <div className="workspace-desc">Brainstorming ideas</div>
        </button>
        {/* ChatGPT */}
        <button className="workspace-card workspace-card--chatgpt" onClick={() => navigate('/chat/chatgpt')}>
          <div className="workspace-icon gradient-chatgpt" aria-hidden>
            <svg width="28" height="28" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012l-8.052-4.651a7.504 7.504 0 0 1-2.744-10.239Zm26.965 6.27-9.722-5.614 3.365-1.945a.122.122 0 0 1 .114-.012l8.052 4.651a7.497 7.497 0 0 1-1.158 13.528V21.228a1.29 1.29 0 0 0-.651-1.339Zm3.35-5.049a7.573 7.573 0 0 0-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V17.827Z" fill="white"/>
            </svg>
          </div>
          <div className="workspace-title">ChatGPT</div>
          <div className="workspace-desc">Advanced AI assistant for conversations</div>
        </button>
        {/* VS Code */}
        <button className="workspace-card" onClick={() => navigate('/vscode')}>
          <div className="workspace-icon gradient-violet" aria-hidden>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" fill="white"/>
            </svg>
          </div>
          <div className="workspace-title">VS Code</div>
          <div className="workspace-desc">Code editor and development</div>
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
