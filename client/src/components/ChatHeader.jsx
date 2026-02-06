import React from "react";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-300 via-sky-300 to-pink-300 shadow-inner" />
        <div>
          <div className="text-sm font-semibold text-gray-800">Ayaan</div>
          <div className="text-xs text-green-600">Online</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-xl px-3 py-2 hover:bg-white/20 text-gray-700" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm8.5 16-4.35-4.35" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="rounded-xl px-3 py-2 hover:bg-white/20 text-gray-700" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M12 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill="#374151" />
          </svg>
        </button>
      </div>
    </div>
  );
}
