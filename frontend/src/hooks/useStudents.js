import { useState, useEffect, useCallback } from "react";
import { fetchStudents as fetchStudentsApi, addStudent as addStudentApi } from "../utils/api";

export function useStudents(searchTerm = "", page = 1, sort = "") {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStudentsApi(searchTerm, page, true, sort);
      if (data && Array.isArray(data.results)) {
        setStudents(data.results);
        setCount(data.count || 0);
        setNext(data.next);
        setPrevious(data.previous);
      } else if (Array.isArray(data)) {
        setStudents(data);
        setCount(data.length);
        setNext(null);
        setPrevious(null);
      } else {
        setStudents([]);
        setCount(0);
        setNext(null);
        setPrevious(null);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, sort]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const addStudent = useCallback(async (student) => {
    setLoading(true);
    setError(null);
    try {
      const newStudent = await addStudentApi(student);
      setStudents((prev) => [...prev, newStudent]);
      return newStudent;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    students,
    loading,
    error,
    addStudent,
    refetch: fetchStudents,
    count,
    next,
    previous,
    hasNoDetails: !loading && students.length === 0,
  };
}
