import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function Classroom({ studentName, teacherName, onBack }) {
  return (
    
    <div className="flex flex-col items-center justify-center p-6">
      <button
          className="mb-6 self-start bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          onClick={onBack}
        >
          ← Go Back to Table
        </button>
      <div className="bg-white rounded-2xl shadow-2xl border border-blue-200 flex flex-col items-center px-10 py-12 max-w-md w-full">
        
        <UserCircleIcon className="w-32 h-32 text-blue-400 mb-4 drop-shadow-lg" />
        <h2 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">
          {studentName}
        </h2>
        <div className="mt-6 text-xl text-gray-700 text-center font-semibold">
          Welcome to{" "}
          <span className="text-blue-600">{teacherName}</span>'s classroom.
        </div>
      </div>
    </div>
  );
}

export default Classroom;
