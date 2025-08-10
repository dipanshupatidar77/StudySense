
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'digital-library',
    resource_type: 'raw', // Important for PDF
    
    format: async (req, file) => 'pdf',
  },
});

const upload = multer({ storage });
module.exports = upload;



