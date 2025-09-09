import { Application } from "../models/application.js";
import { Job } from "../models/job.js";

export const applyForJob = async (userId, jobId) => {
  if (!jobId) throw new Error("Job id is required");

  // Check if already applied
  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: userId,
  });
  if (existingApplication)
    throw new Error("You have already applied for this job");

  // Check if job exists
  const job = await Job.findById(jobId);
  if (!job) throw new Error("Job not found");

  // Create application
  const newApplication = await Application.create({
    job: jobId,
    applicant: userId,
  });

  job.applications.push(newApplication._id);
  await job.save();

  return newApplication;
};

export const getUserApplications = async (userId) => {
  const applications = await Application.find({ applicant: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "job",
      populate: { path: "company" },
    });

  return applications;
};

export const getJobApplicants = async (jobId) => {
  const job = await Job.findById(jobId).populate({
    path: "applications",
    populate: { path: "applicant" },
    options: { sort: { createdAt: -1 } },
  });

  if (!job) throw new Error("Job not found");

  return job;
};

export const updateApplicationStatus = async (applicationId, status) => {
  if (!status) throw new Error("Status is required");

  const application = await Application.findById(applicationId);
  if (!application) throw new Error("Application not found");

  application.status = status.toLowerCase();
  await application.save();

  return application;
};
