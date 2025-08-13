// // src/services/api.js
// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:7000/api',
// });

// export default API;


import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:7000/api',
});

// 🛡️ Add token to every request automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
