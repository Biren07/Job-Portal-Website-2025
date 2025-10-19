import axios from "axios";

const API_URL = "https://job-portal-website-2025-3.onrender.com/api/ai";

export const getInterviewQuestions = async (data) => {
  const response = await axios.post(`${API_URL}/start`, data);
  return response.data.questions;
};
