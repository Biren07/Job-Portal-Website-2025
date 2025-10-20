import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const AppliedJobTable = () => {
  useGetAppliedJobs();

  const { allAppliedJobs } = useSelector((store) => store.job);
  const jobs = allAppliedJobs || [];

  if (jobs.length === 0) {
    return (
      <p className="text-center text-gray-500 py-6">
        You haven't applied to any jobs yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
    
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Job Role</th>
              <th className="py-2 px-4 text-left">Company</th>
              <th className="py-2 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-t hover:bg-gray-50 transition">
                <td className="py-2 px-4">{job.createdAt?.split("T")[0] || "N/A"}</td>
                <td className="py-2 px-4">{job.job?.title || "N/A"}</td>
                <td className="py-2 px-4">{job.job?.company?.name || "N/A"}</td>
                <td className="py-2 px-4 text-right">
                  <Badge
                    className={`${
                      job?.status === "rejected"
                        ? "bg-red-400 text-white"
                        : job?.status === "pending"
                        ? "bg-gray-400 text-white"
                        : "bg-green-400 text-white"
                    } px-2 py-1 rounded-full text-sm`}
                  >
                    {job?.status?.toUpperCase() || "UNKNOWN"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      <div className="md:hidden space-y-3">
        {jobs.map((job) => (
          <div key={job._id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">
                  {job.createdAt?.split("T")[0] || "N/A"}
                </p>
                <h3 className="font-semibold">{job.job?.title || "N/A"}</h3>
                <p className="text-gray-600">{job.job?.company?.name || "N/A"}</p>
              </div>
              <Badge
                className={`${
                  job?.status === "rejected"
                    ? "bg-red-400 text-white"
                    : job?.status === "pending"
                    ? "bg-gray-400 text-white"
                    : "bg-green-400 text-white"
                } px-2 py-1 rounded-full text-sm`}
              >
                {job?.status?.toUpperCase() || "UNKNOWN"}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobTable;
