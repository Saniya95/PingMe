import React from "react";

export default function Tabs() {
  return (
    <div className="w-full mt-4">
      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.2)]">
          <span className="px-4 py-2 rounded-xl bg-white/20 text-gray-800 font-medium shadow-sm">ChatGPT</span>
          <span className="px-4 py-2 rounded-xl text-gray-700 hover:bg-white/10">VS Code</span>
          <span className="px-4 py-2 rounded-xl text-gray-700 hover:bg-white/10">Gemini</span>
          <span className="px-4 py-2 rounded-xl text-gray-700 hover:bg-white/10">Copilot</span>
        </nav>
      </div>
    </div>
  );
}
