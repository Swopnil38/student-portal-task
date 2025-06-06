import React from "react";

export default function ErrorState({ message }) {
  return (
    <div className="flex justify-center items-center py-8">
      <svg className="w-8 h-8 text-red-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
      </svg>
      <span className="text-red-500 text-lg font-medium">{message}</span>
    </div>
  );
}
