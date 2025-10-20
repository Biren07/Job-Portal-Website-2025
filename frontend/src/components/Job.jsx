import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Bookmark, BookmarkCheck, Trash2 } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const API_BASE = "https://job-portal-website-2025-3.onrender.com/api";

const Job = ({ job, isSavedPage = false, onRemove }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSavedPage) return;

    const fetchSavedStatus = async () => {
      try {
        const res = await axios.get(`${API_BASE}/savejob`, {
          withCredentials: true,
        });
        const isAlreadySaved = res.data.some((savedJob) => {
          const savedId = savedJob.jobId._id || savedJob.jobId;
          return savedId === job._id;
        });
        setSaved(isAlreadySaved);
      } catch (err) {
        console.error("Fetch saved status error:", err);
      }
    };

    fetchSavedStatus();
  }, [job._id, isSavedPage]);

  const toggleSave = async () => {
    setLoading(true);
    try {
      if (!saved) {
        await axios.post(
          `${API_BASE}/savejob`,
          { jobId: job._id },
          { withCredentials: true }
        );
        setSaved(true);
        toast.success("Job saved successfully!");
      } else {
        await axios.delete(`${API_BASE}/savejob/${job._id}`, {
          withCredentials: true,
        });
        setSaved(false);
        toast.success("Job removed from saved list!");
        if (isSavedPage && onRemove) onRemove();
      }
    } catch (err) {
      console.error("Toggle save error:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.message || "Failed to update saved status."
      );
    } finally {
      setLoading(false);
    }
  };

  const daysAgo = (time) =>
    Math.floor((new Date() - new Date(time)) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg bg-white border border-gray-100 transition duration-300 flex flex-col justify-between">
 
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>

        {!isSavedPage && (
          <Button
            variant="outline"
            className="rounded-full w-8 h-8 sm:w-9 sm:h-9"
            size="icon"
            onClick={toggleSave}
            disabled={loading}
          >
            {saved ? (
              <BookmarkCheck className="text-blue-600" size={18} />
            ) : (
              <Bookmark size={18} />
            )}
          </Button>
        )}
      </div>

     
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="p-2 sm:p-3 border rounded-full">
          <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </div>
        <div>
          <h1 className="font-semibold text-base sm:text-lg md:text-xl">
            {job?.company?.name}
          </h1>
        </div>
      </div>

      
      <div>
        <h1 className="font-bold text-base sm:text-lg md:text-xl mb-2 text-gray-800">
          {job?.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

     
      <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-4">
        <Badge className="text-blue-700 font-bold text-xs sm:text-sm" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold text-xs sm:text-sm" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold text-xs sm:text-sm" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

     
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto mb-2 sm:mb-0"
        >
          Details
        </Button>

        {isSavedPage ? (
          <Button
            className="bg-red-600 text-white w-full sm:w-auto"
            onClick={async () => {
              try {
                await axios.delete(`${API_BASE}/savejob/${job._id}`, {
                  withCredentials: true,
                });
                toast.success("Job removed from saved list!");
                if (onRemove) onRemove();
              } catch (err) {
                console.error(
                  "Remove saved job error:",
                  err.response?.data || err.message
                );
                toast.error(
                  err.response?.data?.message || "Failed to remove job."
                );
              }
            }}
            disabled={loading}
          >
            {loading ? "Processing..." : <span className="flex items-center gap-2"><Trash2 size={16} /> Remove</span>}
          </Button>
        ) : (
          <Button
            className="bg-[#7209b7] text-white w-full sm:w-auto"
            onClick={toggleSave}
            disabled={loading}
          >
            {loading ? "Processing..." : saved ? "Saved" : "Save For Later"}
          </Button>
        )}
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
};

export default Job;
