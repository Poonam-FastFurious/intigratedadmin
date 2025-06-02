import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data function
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(endpoint);

      if (res.data && res.data.data) {
        setData(res.data.data);
      } else {
        console.error("Invalid API response structure:", res);
      }
    } catch (err) {
      setError(err);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Fetch on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData }; // refetch function return kar raha hai
};

export default useFetchData;
