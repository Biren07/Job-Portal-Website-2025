import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { SlidersHorizontal } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilters, setShowFilters] = useState(false);

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
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

    
      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 md:px-10 flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
          Available Jobs ({filterJobs.length})
        </h1>

        <Button
          variant="outline"
          className="flex items-center gap-2 sm:hidden border border-gray-300"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={18} /> Filters
        </Button>
      </div>

      <div className="max-w-7xl mx-auto mt-5 flex flex-col sm:flex-row gap-5 px-4 sm:px-6 md:px-10">
        
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } sm:block w-full sm:w-1/4 h-full bg-white rounded-md shadow-md p-4 transition-all`}
        >
          <FilterCard />
        </div>

       
        <div className="flex-1 overflow-y-auto">
          {filterJobs.length === 0 ? (
            <span className="text-gray-500">No jobs found</span>
          ) : (
            <div
              className="
                grid
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-3 
                xl:grid-cols-4 
                gap-6
              "
            >
              {filterJobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
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
