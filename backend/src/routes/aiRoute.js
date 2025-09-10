import express from "express";
import { chatWithAI } from "../controllers/aiToolsController.js";
import { startInterview } from "../controllers/aiToolsController.js";

const aiRoute = express.Router();

aiRoute.post("/chat", chatWithAI);
aiRoute.post("/start", startInterview);

export default aiRoute;
