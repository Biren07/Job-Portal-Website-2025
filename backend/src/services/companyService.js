import { Company } from "../models/company.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../config/cloudinary.js";

export const registerCompanyService = async (userId, companyName) => {
  if (!companyName) throw new Error("Company name is required");

  const existingCompany = await Company.findOne({ name: companyName });
  if (existingCompany) throw new Error("You can't register the same company");

  const company = await Company.create({
    name: companyName,
    userId,
  });

  return company;
};

export const getUserCompaniesService = async (userId) => {
  const companies = await Company.find({ userId });
  if (!companies || companies.length === 0) throw new Error("Companies not found");
  return companies;
};

export const getCompanyByIdService = async (companyId) => {
  const company = await Company.findById(companyId);
  if (!company) throw new Error("Company not found");
  return company;
};

export const updateCompanyService = async (companyId, data, file) => {
  const { name, description, website, location } = data;

  let logo = null;
  if (file) {
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    logo = cloudResponse.secure_url;
  }

  const updateData = { name, description, website, location };
  if (logo) updateData.logo = logo;

  const updatedCompany = await Company.findByIdAndUpdate(companyId, updateData, {
    new: true,
  });

  if (!updatedCompany) throw new Error("Company not found");
  return updatedCompany;
};
