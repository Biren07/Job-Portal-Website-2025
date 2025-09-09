import axios from "axios";

async function chatGemini(message) {
  const geminiUrl = process.env.GEMINI_URL;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiUrl || !geminiApiKey) {
    throw new Error("Gemini URL or API Key missing in environment variables");
  }

  const data = {
    contents: [
      {
        parts: [
          {
            text: message,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(`${geminiUrl}?key=${geminiApiKey}`, data);
    return response.data.candidates[0]?.content.parts[0].text;
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    throw new Error("Failed to get AI response from Gemini");
  }
}

export default chatGemini;
