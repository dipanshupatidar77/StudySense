// import axios from 'axios';

// export const generateQuiz = async (formData) => {
//   return await axios.post('http://localhost:7000/api/quiz/generate', formData);
// };


import axios from 'axios';

export const generateQuiz = async (formData) => {
  return await axios.post('http://localhost:7000/api/quiz/generate', formData);
};
