// /server/routes/codeRoutes.js
const express = require('express');
const router = express.Router();
const { compileCode } = require('../controllers/codeController');

router.post('/code', compileCode);

module.exports = router;
