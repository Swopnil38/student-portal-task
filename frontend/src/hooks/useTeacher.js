import { useState, useEffect } from "react";
import { fetchTeacherById } from "../utils/api";

export function useTeacher(teacherId) {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!teacherId) return;
    setLoading(true);
    setError(null);
    fetchTeacherById(teacherId)
      .then(setTeacher)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [teacherId]);

  return { teacher, loading, error };
}
