import React, { useState } from 'react';
import Classroom from './Classroom';

const StudentTable = React.memo(function StudentTable({ students, teacherName, showResultsCount = false, count }) {
  console.log('Rendering StudentTable with students:', students);
  const [classroomStudent, setClassroomStudent] = useState(null);

  const handleClassroomClick = (student) => {
    setClassroomStudent(student);
  };

  const handleBack = () => {
    setClassroomStudent(null);
  };

  if (classroomStudent) {
    return (
      <Classroom
        studentName={classroomStudent.name}
        teacherName={teacherName}
        onBack={handleBack}
      />
    );
  }

  if (!Array.isArray(students)) {
    return <div className="text-red-500">Invalid students data</div>;
  }

  return (
    <div className="overflow-x-auto w-full">
      {/* Show total results count, not just current page */}
      {showResultsCount && (
        <div className="mb-1 ml-1 text-blue-700 font-bold text-base">
          {count} Result's
        </div>
      )}
      <table className="w-full table-auto border-collapse rounded-2xl overflow-hidden text-xs sm:text-sm md:text-base shadow-lg border border-blue-200 bg-white">
        <thead>
          <tr className="bg-blue-100 text-blue-700">
            <th className="p-2 sm:p-3 border-b border-blue-200 text-center font-bold">Name</th>
            <th className="p-2 sm:p-3 border-b border-blue-200 text-center w-1/5 font-bold">Plan</th>
            <th className="p-2 sm:p-3 border-b border-blue-200 text-center font-bold">Status</th>
            <th className="p-2 sm:p-3 border-b border-blue-200 text-center font-bold">Enrolled Date</th>
            <th className="p-2 sm:p-3 border-b border-blue-200 text-center font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id || student.name} className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
              <td className="p-2 sm:p-3 border-blue-100 text-center font-medium">{student.name}</td>
              <td className="p-2 sm:p-3 border-blue-100 text-center w-1/2">{student.plan?.name || student.plan}</td>
              <td className="p-2 sm:p-3 border-blue-100 text-center">
                <span
                  className={
                    student.status === 'in_progress'
                      ? 'bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-semibold inline-block mb-1 mt-1 shadow-sm'
                      : 'bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-xs font-semibold inline-block mb-1 mt-1 shadow-sm'
                  }
                  style={{ minWidth: 90, display: 'inline-block', letterSpacing: 0.5 }}
                >
                  {student.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                </span>
              </td>
              <td className="p-2 sm:p-3 border-blue-100 text-center">{
                student.enrolled_date
                  ? new Date(student.enrolled_date).toLocaleDateString()
                  : ''
              }</td>
              <td className="p-2 sm:p-3 border-blue-100 text-center">
                <button
                  className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full font-semibold shadow-sm hover:bg-blue-600 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 mt-1 mb-1"
                  aria-label={`Go To Classroom for ${student.name}`}
                  onClick={() => handleClassroomClick(student)}
                  style={{ minWidth: 150, letterSpacing: 0.5 }}
                >
                  Go To Classroom
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add a soft gradient at the bottom for a polished look */}
      <div className="w-full h-3 bg-gradient-to-b from-white/0 to-blue-50 rounded-b-2xl -mt-2 rounded" />
    </div>
  );
});

export default StudentTable;
