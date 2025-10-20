import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const isInitiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  // Apply job handler
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...(singleJob?.applications || []), { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to apply.");
    }
  };

  // Fetch single job details
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job?.applications?.some(
              (application) => application.applicant === user?._id
            ) || false
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-3xl mx-auto my-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="ghost" className="text-blue-700 font-bold">
              {singleJob?.position || 0} Positions
            </Badge>
            <Badge variant="ghost" className="text-[#F83002] font-bold">
              {singleJob?.jobType || "N/A"}
            </Badge>
            <Badge variant="ghost" className="text-[#7209b7] font-bold">
              {singleJob?.salary || "N/A"} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`mt-2 sm:mt-0 rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Details */}
      <div className="mt-6 space-y-3">
        {[
          { label: "Role", value: singleJob?.title },
          { label: "Location", value: singleJob?.location },
          { label: "Description", value: singleJob?.description },
          { label: "Experience", value: singleJob?.experience ? `${singleJob.experience} yrs` : "N/A" },
          { label: "Salary", value: singleJob?.salary ? `${singleJob.salary} LPA` : "N/A" },
          { label: "Total Applicants", value: singleJob?.applications?.length || 0 },
          { label: "Posted Date", value: singleJob?.createdAt?.split("T")[0] || "N/A" },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:gap-2">
            <span className="font-bold">{item.label}:</span>
            <span className="pl-2 text-gray-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobDescription;
