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
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center flex flex-col items-center gap-8">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-6 py-2 rounded-full bg-indigo-50 text-[#6A38C2] font-medium shadow-sm"
        >
          🚀 No. 1 Dream Dock Job Portal
        </motion.span>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight flex flex-wrap justify-center gap-3">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.25,
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

        <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
          Dream Dock is your ultimate career hub — connecting passionate job
          seekers with world-class employers. Whether you’re starting out or
          aiming higher, we’ve got the perfect opportunities waiting for you.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="flex w-full md:w-[60%] lg:w-[50%] bg-white shadow-lg border border-gray-200 rounded-full items-center p-2"
        >
          <input
            type="text"
            placeholder="🔍 Find your dream job..."
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-l-full text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-[#6A38C2] hover:bg-[#542ca3] transition-colors px-6 py-2"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </motion.div>
      </div>

      <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-40"></div>
    </section>
  );
};

export default HeroSection;
