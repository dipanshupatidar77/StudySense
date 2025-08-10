// /server/controllers/codeController.js
const { runCodeOnJudge0 } = require('../utils/judge0');

const compileCode = async (req, res) => {
  const { source_code, language_id } = req.body;

  if (!source_code || !language_id) {
    return res.status(400).json({ error: "Missing source_code or language_id" });
  }

  try {
    const result = await runCodeOnJudge0(source_code, language_id);
    res.json(result);
  } catch (error) {
    console.error("Error compiling code:", error.message);
    res.status(500).json({ error: "Failed to compile code", details: error.message });
  }
};

module.exports = { compileCode };
