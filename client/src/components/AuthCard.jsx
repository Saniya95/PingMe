import React from "react";

export default function AuthCard({ children }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-8 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.2)]">
      {children}
    </div>
  );
}
