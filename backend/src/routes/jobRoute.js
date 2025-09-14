import express from "express";
import auth from "../middlewares/auth.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/jobController.js";

const router = express.Router();

// Create a new job (admin only)
router.post("/post", auth, postJob);

// Get all jobs (students)
router.get("/get", auth, getAllJobs);

// Get all jobs created by the authenticated admin
router.get("/getadminjobs", auth, getAdminJobs);

// Get a specific job by ID
router.get("/get/:id", auth, getJobById);

export default router;
