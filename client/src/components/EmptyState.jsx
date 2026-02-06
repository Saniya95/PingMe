import React from "react";

export default function EmptyState() {
  return (
    <div className="h-[600px] w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md relative overflow-hidden">
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-300/30 via-indigo-300/25 to-pink-300/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-pink-300/25 via-sky-300/25 to-indigo-300/25 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.06]" aria-hidden>
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
      </div>

      <div className="relative z-10 h-full grid place-items-center p-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">Select a chat to start a private conversation</h2>
          <p className="text-sm text-gray-600 mt-2">This panel mimics an AI chat workspace.</p>
        </div>
      </div>
    </div>
  );
}
