import React from "react";

export default function LoadingState() {
  return (
    <div className="flex justify-center items-center py-16">
      <svg className="w-10 h-10 animate-spin text-blue-500 mr-2" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      <span className="text-blue-500 text-lg font-semibold">Loading...</span>
    </div>
  );
}
