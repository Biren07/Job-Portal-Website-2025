import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (!searchedQuery) {
      setFilterJobs(allJobs);
      return;
    }

    const filteredJobs = allJobs.filter((job) => {
      const matchLocation = searchedQuery.location
        ? job.location
            ?.toLowerCase()
            .includes(searchedQuery.location.toLowerCase())
        : true;

      const matchTechnology = (() => {
        if (!searchedQuery.technology) return true;

        const input = searchedQuery.technology.trim().toLowerCase();

        if (Array.isArray(job.title)) {
          return job.title.some((tech) =>
            tech.trim().toLowerCase().includes(input)
          );
        } else if (typeof job.title === "string") {
          return job.title
            .split(",")
            .map((tech) => tech.trim().toLowerCase())
            .some((tech) => tech.includes(input));
        }

        return false;
      })();

      const matchExperience = (() => {
        if (!searchedQuery.experience) return true;

        const range = searchedQuery.experience.split("-");
        const min = parseInt(range[0], 10);
        const max = parseInt(range[1], 10);

        const jobExp = parseInt(job.experienceLevel, 10);
        if (isNaN(jobExp)) return false;

        return jobExp >= min && jobExp <= max;
      })();

      return matchLocation && matchTechnology && matchExperience;
    });

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 flex gap-5 h-[88vh]">
        <div className="w-1/5 h-full overflow-y-auto bg-white rounded-md shadow-md p-4">
          <FilterCard />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filterJobs.length === 0 ? (
            <span>No jobs found</span>
          ) : (
            <div className="grid grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1">
              {filterJobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
