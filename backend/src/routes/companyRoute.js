import express from "express";
import auth from "../middlewares/auth.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/companyController.js";
import { singleUpload } from "../utils/multer.js";

const router = express.Router();

// Register a new company
router.post("/register", auth, registerCompany);

// Get all companies of the authenticated user
router.get("/get", auth, getCompany);

// Get a specific company by ID
router.get("/get/:id", auth, getCompanyById);

// Update company information (with optional logo upload)
router.put("/update/:id", auth, singleUpload, updateCompany);

export default router;
