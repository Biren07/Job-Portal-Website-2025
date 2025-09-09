import express from "express";
import auth from "../middlewares/auth.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/applicationController.js";

const router = express.Router();


router.get("/apply/:id",auth, applyJob)
// // Apply for a job
router.post("/apply/:id", auth, applyJob);

// Get all jobs the user has applied for
router.get("/get", auth, getAppliedJobs);

// Get all applicants for a specific job
router.get("/:id/applicants", auth, getApplicants);

// Update the status of a specific application
router.post("/status/:id/update", auth, updateStatus);


export default router;
