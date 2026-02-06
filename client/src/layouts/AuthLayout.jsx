import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-pink-50 relative">
      <div className="pointer-events-none fixed inset-0 -z-0 select-none">
        <div className="absolute top-16 right-24 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-200/40 to-pink-200/40 blur-3xl" />
        <div className="absolute bottom-16 left-24 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-200/40 to-indigo-200/40 blur-3xl" />
      </div>
      <div className="relative z-10 grid min-h-screen place-items-center px-6 py-10">
        {children}
      </div>
    </div>
  );
}
