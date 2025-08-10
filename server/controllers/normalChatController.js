const axios = require("axios");
const apiKey = process.env.GEMINI_API_KEY;

const handleNormalChat = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const response = await axios.post(
     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`
,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Gemini Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Gemini API failed." });
  }
};

module.exports = { handleNormalChat };
