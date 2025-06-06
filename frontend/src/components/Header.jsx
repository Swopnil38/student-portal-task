import React, { useState, useCallback } from "react";
import AddStudentModal from "./AddStudentModal";
import { useTeacher } from "../hooks/useTeacher";
import { UserPlusIcon } from "@heroicons/react/24/outline";

export default function Header({ onStudentAdded, onStudentAddedSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const teacherId = "268f2e58-2c98-4d28-b1e6-bcca85e31fbc";
  const { teacher, loading: teacherLoading, error: teacherError } = useTeacher(teacherId);

  const handleAddStudent = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleAdd = useCallback(async (student) => {
    return await onStudentAdded(student);
  }, [onStudentAdded]);

  return (
    <div className="flex flex-col mb-2 sm:flex-row sm:justify-between sm:items-center">
      <div>
        <h1 className="text-4xl font-bold">
          {teacherLoading ? "Loading..." : teacherError ? "Unknown Teacher" : teacher?.name || "-"}
        </h1>
        <p className="text-gray-600 mt-2 sm:mt-10 font-bold ">{teacher?.specialization || "-"}</p>
      </div>
      <div>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          onClick={handleAddStudent}
          aria-label="Add New Student"
        >
          <UserPlusIcon className="w-5 h-5" aria-hidden="true" />
          <span className="hidden sm:inline">Add New Student</span>
        </button>
      </div>
      
      <AddStudentModal open={showModal} onClose={handleCloseModal} onAdd={handleAdd} onSuccess={onStudentAddedSuccess} teacherId={teacherId} /> 
    </div>
  );
}
