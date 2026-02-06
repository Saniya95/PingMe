import React from "react";
import DropdownMenu from "./DropdownMenu.jsx";

export default function MessageBubble() {
  return (
    <div className="space-y-6">
      <div className="flex justify-start">
        <div className="max-w-[65%] rounded-2xl border border-white/20 bg-white/70 backdrop-blur-md px-4 py-3 shadow-sm">
          <div className="text-sm text-gray-800">Hey! Sharing design notes from the latest sprint.</div>
        </div>
      </div>

      <div className="flex justify-end relative">
        <div className="max-w-[65%] rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 via-sky-50/70 to-pink-50/70 backdrop-blur px-4 py-3 shadow-sm">
          <div className="text-sm text-gray-700">&lt;Encrypted Code&gt;</div>
        </div>
        <button className="ml-2 h-8 w-8 grid place-items-center rounded-xl hover:bg-white/30" aria-label="More">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M12 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill="#374151" />
          </svg>
        </button>
        <DropdownMenu />
      </div>

      <div className="flex justify-start">
        <div className="max-w-[65%] rounded-2xl border border-white/20 bg-white/70 backdrop-blur-md px-4 py-3 shadow-sm">
          <div className="text-sm text-gray-800">Looks great. Let’s polish spacing and shadows for desktop.</div>
        </div>
      </div>
    </div>
  );
}
