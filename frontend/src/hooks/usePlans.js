import { useState, useEffect } from "react";
import { fetchPlans } from "../utils/api";

export function usePlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPlans()
      .then(setPlans)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { plans, loading, error };
}
