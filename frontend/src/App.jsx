import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import SearchBar from "./components/Searchbar";
import StudentTable from "./components/StudentTable";
import { useStudents } from "./hooks/useStudents";
import LoadingState from "./components/LoadingState";
import EmptyState from "./components/EmptyState";
import ErrorState from "./components/ErrorState";


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [classroomStudent, setClassroomStudent] = useState(null);
  const {
    loading,
    error,
    addStudent,
    count,
    fetchStudentsPage
  } = useStudents();

  const hasNoDetails = !loading && students.length === 0;

  // Fetch first page or on search/sort change
  React.useEffect(() => {
    setPage(1);
    fetchStudentsPage({
      searchTerm,
      page: 1,
      sort,
      append: false,
      onResult: (results) => {
        setStudents(results);
      }
    });
  }, [searchTerm, sort, fetchStudentsPage]);

  // Infinite scroll: fetch next page and append
  const fetchNextPage = useCallback(() => {
    if (students.length >= count) return;
    const nextPage = page + 1;
    fetchStudentsPage({
      searchTerm,
      page: nextPage,
      sort,
      append: true,
      onResult: (results) => {
        setStudents((prev) => [...prev, ...results]);
        setPage(nextPage);
      }
    });
  }, [students, count, page, searchTerm, sort, fetchStudentsPage]);

  const handleStudentAdded = async (student) => {
    try {
      const newStudent = await addStudent(student);
      setStudents((prev) => [newStudent, ...prev]);
      return newStudent;
    } catch {
      // Error handled in hook
    }
  };

  const handleStudentAddedSuccess = () => {
    setPage(1);
    fetchStudentsPage({
      searchTerm,
      page: 1,
      sort,
      append: false,
      onResult: (results) => setStudents(results)
    });
  };

  const handleSearch = (term, sortValue) => {
    setSearchTerm(term);
    setSort(sortValue || sort);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  // Handler to enter classroom view
  const handleClassroomClick = (student) => {
    setClassroomStudent(student);
  };
  // Handler to exit classroom view
  const handleBackFromClassroom = () => {
    setClassroomStudent(null);
  };

  const inClassroom = Boolean(classroomStudent);
  const hasNoDetails = !loading && students.length === 0;

  return (
    <div className="p-2 sm:p-6 w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header onStudentAdded={handleStudentAdded} onStudentAddedSuccess={handleStudentAddedSuccess} />
      {/* Hide SearchBar in Classroom view */}
      {!inClassroom && (
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <SearchBar onSearch={handleSearch} sortValue={sort} onSortChange={handleSortChange} />
        </div>
      )}
      {error && <ErrorState message={error.message} />}
      {loading && students.length === 0 ? (
        <LoadingState />
      ) : hasNoDetails ? (
        <EmptyState />
      ) : (
        <StudentTable
          students={students}
          searchTerm={inClassroom ? '' : searchTerm}
          teacherName={"Teacher"}
          showResultsCount={true}
          count={count}
          onClassroomClick={handleClassroomClick}
          classroomStudent={classroomStudent}
          onBackFromClassroom={handleBackFromClassroom}
          fetchNextPage={fetchNextPage}
          hasMore={students.length < count}
          loading={loading}
        />
      )}
    </div>
  );
}

export default App;

