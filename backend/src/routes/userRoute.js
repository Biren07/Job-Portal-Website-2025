import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import { singleUpload } from "../utils/multer.js";

const router = express.Router();

router.post("/register",singleUpload,register);
router.post("/login",login);
router.get("/logout",logout);
router.put("/update/:id",auth,singleUpload,updateProfile);

export default router;
