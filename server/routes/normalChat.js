const express = require("express");
const router = express.Router();
const { handleNormalChat } = require("../controllers/normalChatController");

router.post("/normal", handleNormalChat);

module.exports = router;
