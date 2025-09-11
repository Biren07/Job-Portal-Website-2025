import axios from "axios";

const API_URL = "http://localhost:8000/api/ai";

export const getInterviewQuestions = async (data) => {
  const response = await axios.post(`${API_URL}/start`, data);
  return response.data.questions;
};
