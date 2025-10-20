import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Chatbot from "./ui/chatBot";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">
          Search Results ({allJobs.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allJobs.length > 0 ? (
            allJobs.map((job) => <Job key={job._id} job={job} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10">
              No jobs found matching your search.
            </p>
          )}
        </div>

      
        <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default Browse;
