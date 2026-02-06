import React from "react";

export default function Input({ placeholder = "Enter text", type = "text", value, onChange, name }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/30 bg-white/70 backdrop-blur-md px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
    />
  );
}
