// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/uploadMiddleware');
// const { uploadFile, getAllFiles } = require('../controllers/libraryController');

// // Upload PDF
// router.post('/upload', upload.single('file'), uploadFile);

// // Get all files
// router.get('/files', getAllFiles);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/uploadMiddleware');
// const { uploadFileController, getAllFilesController } = require('../controllers/libraryController');

// // Upload PDF
// router.post('/upload', upload.single('file'), uploadFileController);

// // Get all files
// router.get('/files', getAllFilesController);

// module.exports = router;


const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadPdf, getAllPDFs } = require('../controllers/libraryController');

router.post('/upload', upload.single('file'), uploadPdf);
router.get('/files', getAllPDFs);

module.exports = router;
