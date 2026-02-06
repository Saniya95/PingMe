import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-6 h-20 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.2)] flex items-center justify-between">
      <div className="flex items-center gap-3 h-full">
        <img src="/icons/icon-64.png" alt="PingMe" className="h-[80%] aspect-square rounded-xl shadow-inner object-cover" />
        <span className="text-lg font-semibold text-gray-800">PingMe</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-xl p-2 hover:bg-white/20" aria-label="Notifications">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M12 3a5 5 0 0 1 5 5v3.586l1.293 1.293A1 1 0 0 1 18.586 15H5.414a1 1 0 0 1-.707-1.707L6 11.586V8a5 5 0 0 1 5-5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button className="rounded-xl p-2 hover:bg-white/20" aria-label="Settings">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm7.5 3a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" stroke="#374151" strokeWidth="1.5" />
          </svg>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-300 via-sky-300 to-pink-300" />
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="ml-2 rounded-xl border border-white/30 bg-white/60 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-white/80"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
