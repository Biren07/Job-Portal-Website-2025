import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left mb-8">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allJobs.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No jobs available at the moment.
          </p>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
