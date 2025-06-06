import { useState, useCallback } from "react";
import { fetchStudents as fetchStudentsApi, addStudent as addStudentApi } from "../utils/api";

export function useStudents() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  // Fetch a specific page, with options to append or replace
  const fetchStudentsPage = useCallback(
    async ({ searchTerm = "", page = 1, sort = "", append = false, onResult }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchStudentsApi(searchTerm, page, true, sort);
        if (data && Array.isArray(data.results)) {
          setCount(data.count || 0);
          if (onResult) onResult(data.results, data.count || 0);
        } else if (Array.isArray(data)) {
          setCount(data.length);
          if (onResult) onResult(data, data.length);
        } else {
          setCount(0);
          if (onResult) onResult([], 0);
        }
      } catch (err) {
        setError(err);
        if (onResult) onResult([], 0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const addStudent = useCallback(
    async (student) => {
      setLoading(true);
      setError(null);
      try {
        const newStudent = await addStudentApi(student);
        return newStudent;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    addStudent,
    fetchStudentsPage,
    count,
    hasNoDetails: !loading,
  };
}
