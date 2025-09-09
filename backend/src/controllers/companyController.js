import {
  registerCompanyService,
  getUserCompaniesService,
  getCompanyByIdService,
  updateCompanyService,
} from "../services/companyService.js";

export const registerCompany = async (req, res) => {
  try {
    const company = await registerCompanyService(req.id, req.body.companyName);
    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const getCompany = async (req, res) => {
  try {
    const companies = await getUserCompaniesService(req.id);
    return res.status(200).json({ companies, success: true });
  } catch (error) {
    return res.status(404).json({ message: error.message, success: false });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await getCompanyByIdService(req.params.id);
    return res.status(200).json({ company, success: true });
  } catch (error) {
    return res.status(404).json({ message: error.message, success: false });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const updatedCompany = await updateCompanyService(req.params.id, req.body, req.file);
    return res.status(200).json({
      message: "Company information updated",
      company: updatedCompany,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
