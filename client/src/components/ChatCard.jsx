import React from "react";

export default function ChatCard({ title, preview }) {
  return (
    <div className="group rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-4 hover:bg-white/20 transition-all duration-200 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-300 via-sky-300 to-pink-300 shadow-inner" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
            <span className="text-xs text-gray-500">just now</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">{preview}</p>
        </div>
      </div>
    </div>
  );
}
