// /server/utils/judge0.js
const axios = require('axios');

const runCodeOnJudge0 = async (source_code, language_id) => {
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
    data: {
      language_id: parseInt(language_id),
      source_code,
    },
  };

  const response = await axios.request(options);
  return response.data;
};

module.exports = { runCodeOnJudge0 };
