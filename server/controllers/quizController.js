
// const axios = require("axios");
// require("dotenv").config();



// const generateQuiz = async (req, res) => {
//   const { subject, topics, difficulty, type, number, note } = req.body;

//   if (!subject || !topics || !difficulty || !type || !number) {
//     return res.status(400).json({ error: "Required fields missing" });
//   }

//   const cleanType = type.toLowerCase();

//   const prompt = `
// Generate ${number} ${cleanType === "mcq" ? "multiple choice (mcq)" : "short answer"} questions on the topic(s): ${topics.join(", ")} under the subject "${subject}".
// Difficulty: ${difficulty}
// Use-case: ${note || "none"}

// If type is "mcq":
// Return JSON array like:
// [
//   {
//     question: "...",
//     options: ["A", "B", "C", "D"],
//     correctAnswer: "...",
//     explanation: "..."
//   }
// ]

// If type is "short answer":
// Return JSON array like:
// [
//   {
//     question: "...",
//     answer: "...",
//     explanation: "..."
//   }
// ]

// Only return pure JSON wrapped inside triple backticks (\`\`\`)
// `;

//   try {
//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY_QUIZ}`,
//       {
//         contents: [
//           {
//             parts: [{ text: prompt }],
//           },
//         ],
//       },
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     let resultText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     const match = resultText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
//     const cleaned = match ? match[1] : resultText;

//     const quiz = JSON.parse(cleaned);
//     res.json({ quiz });

//   } catch (error) {
//     console.error("Gemini Quiz Error:", error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to generate quiz." });
//   }
// };

// module.exports = { generateQuiz };


const axios = require("axios");
require("dotenv").config();

const generateQuiz = async (req, res) => {
  const { subject, topics, difficulty, type, number, note } = req.body;

  if (!subject || !topics || !difficulty || !type || !number) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const cleanType = type.toLowerCase();

  const prompt = `
Generate ${number} ${cleanType === "mcq" ? "multiple choice (mcq)" : "short answer"} questions on the topic(s): ${topics.join(", ")} under the subject "${subject}".
Difficulty: ${difficulty}
Use-case: ${note || "none"}

If type is "mcq":
Return JSON array like:
[
  {
    question: "...",
    options: ["A", "B", "C", "D"],
    correctAnswer: "...",
    explanation: "..."
  }
]

If type is "short answer":
Return JSON array like:
[
  {
    question: "...",
    answer: "...",
    explanation: "..."
  }
]

Only return pure JSON wrapped inside triple backticks (\`\`\`)
`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY_QUIZ}`,
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

    let resultText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const match = resultText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    const cleaned = match ? match[1] : resultText;

    let quiz = JSON.parse(cleaned);

    //  Normalize: convert correctAnswer → answer (for MCQ)
    if (cleanType === "mcq") {
      quiz = quiz.map((q) => ({
        ...q,
        answer: q.correctAnswer || "",
         // ensure 'answer' is present
      }));
    }
      else if (cleanType === "short answer") {
  quiz = quiz.map((q) => {
    const { correctAnswer, options, ...rest } = q;
    return rest; // remove options and correctAnswer if accidentally added
  });
    }

    res.json({ quiz });

  } catch (error) {
    console.error("Gemini Quiz Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate quiz." });
  }
};

module.exports = { generateQuiz };
