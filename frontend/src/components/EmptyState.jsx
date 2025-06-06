import React from "react";

export default function EmptyState() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16">
      <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75c-4.556 0-8.25 2.29-8.25 5.25 0 2.96 3.694 5.25 8.25 5.25s8.25-2.29 8.25-5.25c0-2.96-3.694-5.25-8.25-5.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.25c-4.556 0-8.25 2.29-8.25 5.25v.25a.75.75 0 00.75.75h15a.75.75 0 00.75-.75v-.25c0-2.96-3.694-5.25-8.25-5.25z" />
      </svg>
      <span className="text-lg text-gray-500 font-medium text-center">No student details found.<br/>Add a new student to get started!</span>
    </div>
  );
}
