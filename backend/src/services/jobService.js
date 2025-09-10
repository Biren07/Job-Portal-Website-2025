import mongoose from "mongoose";
import { Job } from "../models/job.js";
import chatGemini from "../utils/chatGemini.js";

// Create a new job with AI-generated short description

export const createJob = async (userId, data) => {
  const { title, requirements, salary, location, jobType, experienceLevel, position, companyId } = data;

  // Generate AI short description
  const shortDescription = await chatGemini(`Generate a concise 40-word job description for: "${title}"`);

   const formattedRequirements = Array.isArray(requirements)
    ? requirements.map(r => r.trim())
    : requirements.split(",").map(r => r.trim());
  return Job.create({
    title,
    description: shortDescription,
    requirements: formattedRequirements,
    salary,
    location,
    jobType,
   experienceLevel,
    position,
    company: companyId,
    created_by: userId,
  });
};

// Get all jobs (students)
export const fetchAllJobs = async (keyword = "") => {
  const query = {
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { shortDescription: { $regex: keyword, $options: "i" } },
    ],
  };
  return Job.find(query).populate("company").sort({ createdAt: -1 });
};

// Get job by ID
export const fetchJobById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid job ID");

  const job = await Job.findById(id).populate("applications");
  if (!job) throw new Error("Job not found");

  return job;
};

// Get jobs created by admin
export const fetchAdminJobs = async (adminId) => {
  const jobs = await Job.find({ created_by: adminId }).populate("company").sort({ createdAt: -1 });
  if (!jobs.length) throw new Error("No jobs found for this admin");

  return jobs;
};
