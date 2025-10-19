import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import applicationRoute from "./routes/applicationRoute.js"
import companyRoute from "./routes/companyRoute.js";
import  jobRoute from "./routes/jobRoute.js";
import aiRoute from "./routes/aiRoute.js";
import jobsave from "./routes/saveJobRoute.js"
dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,              
}));

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/user", userRoute);
app.use("/api/application", applicationRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/ai",aiRoute);
app.use("/api/savejob",jobsave)


app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
