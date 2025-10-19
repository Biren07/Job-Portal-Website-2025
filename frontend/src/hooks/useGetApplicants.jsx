import { useEffect, useState } from "react";
import axios from "axios";

const useGetApplicants = (jobId, token) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return; // Skip if no jobId is provided

    const fetchApplicants = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://job-portal-website-2025-2.onrender.com/api/application/:id/applicants`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // send JWT if required
            },
            withCredentials: true, // keep if using cookies
          }
        );

        setApplicants(response.data);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId, token]);

  return { applicants, loading, error };
};

export default useGetApplicants;
