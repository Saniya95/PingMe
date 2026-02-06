import React from "react";

export default function Button({ children, className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      {...props}
      className={
        "w-full rounded-2xl bg-gradient-to-br from-indigo-300 via-sky-300 to-pink-300 text-gray-800 font-medium shadow-[0_10px_30px_-12px_rgba(0,0,0,0.2)] px-4 py-2 hover:opacity-95 transition " +
        className
      }
    >
      {children || "Continue"}
    </button>
  );
}
