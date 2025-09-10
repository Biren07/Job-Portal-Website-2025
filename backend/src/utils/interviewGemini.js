import chatGemini from "./chatGemini.js";

const generateInterviewQuestions = async ({ role, skills, bio }) => {
  try {
    const prompt = `
      Generate 10 interview questions for the role: "${role}".
      Required skills: ${skills.join(", ")}.
      Bio/Context: ${bio || "No additional info"}.
      Provide concise, clear questions.
    `;

    const response = await chatGemini(prompt);

    // Split response by newlines if Gemini returns a numbered list
    const questionsArray = response.split("\n").filter((q) => q.trim() !== "");

    return questionsArray;
  } catch (error) {
    console.error("Error generating interview questions:", error);
    throw new Error("Failed to generate interview questions");
  }
};

export default generateInterviewQuestions;
