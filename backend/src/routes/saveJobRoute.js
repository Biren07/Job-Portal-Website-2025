import express from "express";
import {
  getSavedJobs,
  saveJob,
  removeSavedJob,
} from "../controllers/saveJobController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, getSavedJobs);

router.post("/", auth, saveJob);

router.delete("/:jobId", auth, removeSavedJob);

export default router;
