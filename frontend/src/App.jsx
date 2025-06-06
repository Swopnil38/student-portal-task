import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/Searchbar";
import StudentTable from "./components/StudentTable";
import { useStudents } from "./hooks/useStudents";
import LoadingState from "./components/LoadingState";
import EmptyState from "./components/EmptyState";
import ErrorState from "./components/ErrorState";
import Pagination from "./components/Pagination";


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const { students, loading, error, addStudent, refetch, count, next, hasNoDetails } = useStudents(searchTerm, page, sort);

  const handleStudentAdded = async (student) => {
    try {
      return await addStudent(student);
    } catch {
      // Error handled in hook
    }
  };

  const handleStudentAddedSuccess = () => {
    refetch();
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

  const totalPages = Math.ceil(count / 7) || 1;

  return (
    <div className="p-2 sm:p-6 w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header onStudentAdded={handleStudentAdded} onStudentAddedSuccess={handleStudentAddedSuccess} />
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <SearchBar onSearch={handleSearch} sortValue={sort} onSortChange={handleSortChange} />
        {/* Sort By select is inside SearchBar, so no need to duplicate here */}
      </div>
      {error && <ErrorState message={error.message} />}
      {loading ? (
        <LoadingState />
      ) : hasNoDetails ? (
        <EmptyState />
      ) : (
        // Only show results count if not in Classroom view
        <StudentTable
          students={students}
          searchTerm={searchTerm}
          teacherName={"Teacher"}
          showResultsCount={true}
          count={count}
        />
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        studentsLength={students.length}
        count={count}
        next={next}
        setPage={setPage}
        alwaysShow={true} // Pass a prop to always show pagination
      />
    </div>
  );
}

export default App;

