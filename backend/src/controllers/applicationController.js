import {
  applyForJob,
  getUserApplications,
  getJobApplicants,
  updateApplicationStatus,
} from "../services/applicationService.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    await applyForJob(userId, jobId);

    return res
      .status(201)
      .json({ message: "Job applied successfully", success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await getUserApplications(userId);

    if (!applications.length) {
      return res
        .status(404)
        .json({ message: "No applications", success: false });
    }

    return res.status(200).json({ applications, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await getJobApplicants(jobId);

    return res.status(200).json({ job, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    await updateApplicationStatus(applicationId, status);

    return res
      .status(200)
      .json({ message: "Status updated successfully", success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
