import React from "react";

export default function DropdownMenu() {
  return (
    <div className="absolute right-0 top-8 w-44 rounded-xl border border-white/20 bg-white/80 backdrop-blur-md shadow-lg">
      <div className="py-2">
        <div className="px-3 py-2 text-sm text-gray-800 hover:bg-white/60 rounded-lg">Copy</div>
        <div className="px-3 py-2 text-sm text-gray-800 hover:bg-white/60 rounded-lg">Forward</div>
        <div className="px-3 py-2 text-sm text-gray-800 hover:bg-white/60 rounded-lg">Delete</div>
      </div>
    </div>
  );
}
