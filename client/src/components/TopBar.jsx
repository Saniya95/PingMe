import React from "react";

export default function TopBar() {
  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-6 py-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-300 via-sky-300 to-pink-300 shadow-inner" />
            <span className="text-xl font-semibold text-gray-800">PingMe</span>
          </div>
          <div className="text-sm text-gray-600">Minimal private chat UI</div>
        </div>
      </div>
    </header>
  );
}
