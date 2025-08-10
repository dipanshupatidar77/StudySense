
const axios = require("axios");
require("dotenv").config();

const handleCustomChat = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return res.json({ response: reply });
  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Gemini API failed." });
  }
};

module.exports = { handleCustomChat };
