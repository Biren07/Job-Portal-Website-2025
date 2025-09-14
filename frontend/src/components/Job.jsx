import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Bookmark, BookmarkCheck, Trash2 } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Job = ({ job, isSavedPage = false, onRemove }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Removed localStorage.getItem("token")

  // Check saved status only for Jobs page
  useEffect(() => {
    if (isSavedPage) return;

    const fetchSavedStatus = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/savejob", {
          withCredentials: true, // 🔑 send cookies
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

  // Save / Remove job
  const toggleSave = async () => {
    setLoading(true);
    try {
      if (!saved) {
        // Save job
        await axios.post(
          "http://localhost:8000/api/savejob",
          { jobId: job._id },
          { withCredentials: true } // 🔑 send cookies
        );
        setSaved(true);
        toast.success("Job saved successfully!");
      } else {
        // Remove job
        await axios.delete(`http://localhost:8000/api/savejob/${job._id}`, {
          withCredentials: true, // 🔑 send cookies
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
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 relative">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>

        {!isSavedPage && (
          <Button
            variant="outline"
            className="rounded-full"
            size="icon"
            onClick={toggleSave}
            disabled={loading}
          >
            {saved ? <BookmarkCheck className="text-blue-600" /> : <Bookmark />}
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 overflow-hidden text-ellipsis max-h-[4.5rem]">
          {job?.description}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>

        {isSavedPage ? (
          <Button
            className="bg-red-600 text-white"
            onClick={async () => {
              try {
                await axios.delete(
                  `http://localhost:8000/api/savejob/${job._id}`,
                  { withCredentials: true } // 🔑 send cookies
                );
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
            {loading ? (
              "Processing..."
            ) : (
              <span className="flex items-center gap-2">
                <Trash2 size={16} /> Remove
              </span>
            )}
          </Button>
        ) : (
          <Button
            className="bg-[#7209b7]"
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
