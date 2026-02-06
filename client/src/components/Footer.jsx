import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-6 px-6 text-gray-600">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Left */}
        <div className="text-sm md:text-left text-center">
          <div>© 2026 PingMe</div>
          <div className="text-xs text-gray-500">AI-powered communication platform</div>
        </div>
        {/* Center */}
        <div className="flex justify-center items-center gap-4 text-sm">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span className="text-gray-400">·</span>
          <a href="#" className="hover:underline">Terms of Service</a>
          <span className="text-gray-400">·</span>
          <a href="#" className="hover:underline">Contact</a>
        </div>
        {/* Right */}
        <div className="flex md:justify-end justify-center items-center gap-3">
          <a aria-label="Twitter" href="#" className="h-8 w-8 rounded-full border border-gray-300/60 bg-white/40 backdrop-blur-sm grid place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M20 7.5c-.6.3-1.2.5-1.9.6a3.3 3.3 0 0 0-5.7 2.2v.5c-2.8-.1-5.3-1.5-7-3.7-.6 1.2-.3 2.6.7 3.4-.5 0-1-.1-1.4-.4 0 1.6 1.1 3 2.7 3.3-.5.1-1 .1-1.5 0 .4 1.3 1.6 2.2 3 2.2A6.6 6.6 0 0 1 4 17.5a9.3 9.3 0 0 0 5 1.5c6 0 9.4-5 9.4-9.4v-.4c.7-.5 1.2-1.1 1.6-1.8-.6.3-1.2.5-1.8.6Z" stroke="#6B7280" strokeWidth="1.2"/></svg>
          </a>
          <a aria-label="GitHub" href="#" className="h-8 w-8 rounded-full border border-gray-300/60 bg-white/40 backdrop-blur-sm grid place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M12 2a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5v-1.8c-3 .7-3.6-1.5-3.6-1.5-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3.1.8.1-.7.4-1.1.7-1.4-2.4-.3-5-1.2-5-5.4 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 2.9 1.1.8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c2-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.2-2.6 5.1-5 5.4.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2Z" stroke="#6B7280" strokeWidth="1.2"/></svg>
          </a>
          <a aria-label="LinkedIn" href="#" className="h-8 w-8 rounded-full border border-gray-300/60 bg-white/40 backdrop-blur-sm grid place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M7 10v7m0-9v0m5 2v7m0-5c0-1.1.9-2 2-2s2 .9 2 2v5" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
