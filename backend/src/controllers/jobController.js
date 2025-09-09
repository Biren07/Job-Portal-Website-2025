import {
  createJob,
  fetchAllJobs,
  fetchJobById,
  fetchAdminJobs,
} from "../services/jobService.js";

export const postJob = async (req, res) => {
  try {
    const job = await createJob(req.id, req.body);
    return res.status(201).json({ message: "Job created successfully", job, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await fetchAllJobs(req.query.keyword);
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    return res.status(404).json({ message: error.message, success: false });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await fetchJobById(req.params.id);
    return res.status(200).json({ job, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const jobs = await fetchAdminJobs(req.id);
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    return res.status(404).json({ message: error.message, success: false });
  }
};
