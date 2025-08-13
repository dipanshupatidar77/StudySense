// // services/LibraryService.js
// import API from './api';

// export const uploadFile = (formData) => API.post('/library/upload', formData);
// export const fetchFiles = () => API.get('/library/files');
// export const getFileById = (id) => API.get(`/library/files/${id}`);

import API from './api';

export const uploadFile = (formData) => API.post('/library/upload', formData);
export const fetchFiles = () => API.get('/library/files');
export const getFileById = (id) => API.get(`/library/files/${id}`);
