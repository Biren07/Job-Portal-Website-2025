import React, { useEffect, useState } from "react";
import Navbar from "../components/shared/Navbar";
import Job from "./Job";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SavedJob = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get(
        "https://job-portal-website-2025-3.onrender.com/api/savejob",
        { withCredentials: true }
      );
      setSavedJobs(res.data.map((item) => item.jobId));
    } catch (err) {
      console.error("Error fetching saved jobs:", err.response?.data || err.message);
      toast.error("Failed to fetch saved jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleRemove = (jobId) => {
    setSavedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Saved Jobs</h1>

        {loading ? (
          <p className="text-center text-blue-600 text-lg">Loading saved jobs...</p>
        ) : savedJobs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No saved jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <Job
                key={job._id}
                job={job}
                isSavedPage={true}
                onRemove={() => handleRemove(job._id)}
              />
            ))}
          </div>
        )}
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
};

export default SavedJob;
