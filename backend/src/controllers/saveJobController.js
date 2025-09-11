import mongoose from "mongoose";
import SavedJob from "../models/saveforjobs.js";

// Get all saved jobs for the logged-in user
export const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ userId: req.id }).populate("jobId");
    res.json(savedJobs);
  } catch (err) {
    console.error("Get saved jobs error:", err);
    res.status(500).json({ message: "Failed to fetch saved jobs" });
  }
};

// Save a job
export const saveJob = async (req, res) => {
  try {
    const userId = req.id;
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const existing = await SavedJob.findOne({ userId, jobId });
    if (existing) {
      return res.status(400).json({ message: "Job already saved" });
    }

    const savedJob = await SavedJob.create({ userId, jobId });
    res.status(201).json({ message: "Job saved successfully", savedJob });
  } catch (err) {
    console.error("Save job error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove a saved job
export const removeSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const deleted = await SavedJob.findOneAndDelete({
      userId: req.id, // from auth middleware
      jobId: new mongoose.Types.ObjectId(jobId), // <--- fix here
    });

    if (!deleted) {
      return res.status(404).json({ message: "Saved job not found" });
    }

    res.json({ message: "Job removed from saved list" });
  } catch (err) {
    console.error("Remove saved job error:", err);
    res.status(500).json({ message: "Failed to remove job" });
  }
};