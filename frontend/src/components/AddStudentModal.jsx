import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { sanitizeInput } from '../utils/sanitize';
import { usePlans } from '../hooks/usePlans';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

function AddStudentModal({ open, onClose, onAdd, onSuccess, teacherId }) {
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState("not_started");
  const [session, setSession] = useState(() => {
    // Set default session date to today as a Date object
    return new Date();
  });

  const { plans, loading: plansLoading, error: plansError } = usePlans();
  const formRef = useRef();

  useEffect(() => {
    if (!open) {
      setName("");
      setPlan("");
      setStatus("not_started");
      setSession(new Date()); // Reset to today as Date object
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && plan && status && session) {
      try {
        // Sanitize user input before sending
        const sanitizedStudent = {
          name: sanitizeInput(name),
          plan_id: sanitizeInput(plan),
          status: sanitizeInput(status),
          teacher_id: teacherId, // Pass teacher_id as required by backend
          // Format session as yyyy-mm-dd
          session: session.toISOString().split("T")[0],
        };
        const backendStudent = await onAdd(sanitizedStudent);
        Swal.fire({
          icon: "success",
          title: "Student added successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        if (onSuccess) onSuccess(backendStudent);
        onClose();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to add student",
          text: error.message,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields",
      });
    }
  };

  if (!open) return null;

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-10 rounded-2xl shadow-2xl min-w-[320px] max-w-lg w-full sm:min-w-[400px] border border-blue-200 relative animate-fadeIn">
        
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight drop-shadow-sm">
          Add New Student
        </h2>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700 mb-1" htmlFor="student-name">
              Student Name
            </label>
            <input
              id="student-name"
              type="text"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-blue-200 focus:border-blue-500 px-4 py-3 rounded-lg text-lg bg-blue-50 focus:bg-white transition-colors outline-none shadow-sm"
              required
              aria-label="Student Name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700 mb-1" htmlFor="plan">
              Plan
            </label>
            <select
              id="plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="border-2 border-blue-200 focus:border-blue-500 px-4 py-3 rounded-lg text-lg bg-blue-50 focus:bg-white transition-colors outline-none shadow-sm"
              required
              aria-label="Plan"
              disabled={plansLoading}
            >
              <option value="">{plansLoading ? "Loading..." : "Select a plan"}</option>
              {plans.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {plansError && <span className="text-red-500 text-sm">Failed to load plans</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700 mb-1" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border-2 border-blue-200 focus:border-blue-500 px-4 py-3 rounded-lg text-lg bg-blue-50 focus:bg-white transition-colors outline-none shadow-sm"
              required
              aria-label="Status"
            >
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700 mb-1" htmlFor="session">
              Next Session
            </label>
            <div className="flex flex-col relative gap-1">
              <DatePicker
                id="session"
                selected={session}
                onChange={(date) => setSession(date)}
                dateFormat="yyyy-MM-dd"
                className="border-2 border-blue-200 focus:border-blue-500 px-4 py-3 rounded-lg text-lg bg-blue-50 focus:bg-white transition-colors outline-none shadow-sm w-full pr-10"
                required
                aria-label="Next Session"
                placeholderText="Select date"
                calendarClassName="z-[60]"
                popperPlacement="bottom-start"
              />
              {/* Place the icon inside the input using pointer-events-none and absolute positioning */}
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center h-full">
                <FaCalendarAlt className="text-blue-400" size={20} />
              </span>
            </div>
          </div>
          <div className="flex gap-4 mt-6 justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold text-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-8 py-2 rounded-lg font-semibold text-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudentModal;