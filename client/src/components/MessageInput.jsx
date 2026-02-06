import React from "react";

export default function MessageInput() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-3 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.2)]">
      <button className="h-10 w-10 grid place-items-center rounded-xl hover:bg-white/20" aria-label="Add">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M12 5v14M5 12h14" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div className="flex-1">
        <div className="rounded-xl border border-white/20 bg-white/70 backdrop-blur-md px-4 py-2">
          <div className="text-sm text-gray-500">Type a message...</div>
        </div>
      </div>
      <button className="h-10 px-4 rounded-xl bg-gradient-to-br from-indigo-300 via-sky-300 to-pink-300 text-gray-800 font-medium shadow-sm" aria-label="Send">Send</button>
    </div>
  );
}
