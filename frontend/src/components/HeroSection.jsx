import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const words = ["Search,", "Apply", "&", "Get", "Your", "Dream", "Jobs"];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 overflow-x-hidden">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-6 sm:gap-8">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 sm:px-6 py-1 sm:py-2 rounded-full bg-indigo-50 text-[#6A38C2] font-medium shadow-sm text-sm sm:text-base"
        >
          🚀 No. 1 Dream Dock Job Portal
        </motion.span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight flex flex-wrap justify-center gap-2 sm:gap-3">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.2,
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
              className={
                word === "Dream" || word === "Jobs"
                  ? "text-[#6A38C2] drop-shadow-sm"
                  : "text-gray-900"
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <p className="text-gray-600 max-w-3xl text-base sm:text-lg leading-relaxed">
          Dream Dock is your ultimate career hub — connecting passionate job
          seekers with world-class employers. Whether you’re starting out or
          aiming higher, we’ve got the perfect opportunities waiting for you.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row w-full sm:w-[80%] md:w-[70%] lg:w-[60%] bg-white shadow-lg border border-gray-200 rounded-full items-center p-2"
        >
          <input
            type="text"
            placeholder="🔍 Find your dream job..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
            className="flex-1 px-4 py-2 rounded-full sm:rounded-l-full text-gray-700 placeholder-gray-400 focus:outline-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="mt-2 sm:mt-0 sm:ml-2 rounded-full bg-[#6A38C2] hover:bg-[#542ca3] transition-colors px-6 py-2 w-full sm:w-auto flex justify-center"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </motion.div>
      </div>

      <div className="absolute top-6 left-6 w-24 h-24 sm:w-32 sm:h-32 bg-indigo-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-6 right-6 w-32 h-32 sm:w-40 sm:h-40 bg-purple-100 rounded-full blur-3xl opacity-40"></div>
    </section>
  );
};

export default HeroSection;
