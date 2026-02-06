import React from "react";

export default function CategoryCard({ title, description, icon }) {
  return (
    <div className="group cursor-pointer rounded-3xl border border-white/20 bg-white/20 backdrop-blur-md p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] hover:bg-white/30 transition flex flex-col items-start gap-4">
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-300 via-sky-300 to-pink-300 shadow-inner grid place-items-center overflow-hidden">
        {icon}
      </div>
      <div className="space-y-1">
        <div className="text-lg font-semibold text-gray-800">{title}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
      <div className="mt-6 w-full rounded-2xl border border-white/30 bg-white/50 h-10" />
    </div>
  );
}
