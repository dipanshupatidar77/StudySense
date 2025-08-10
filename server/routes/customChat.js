const express = require("express");
const router = express.Router();
const { handleCustomChat } = require("../controllers/customChatController");

router.post("/custom", handleCustomChat);

module.exports = router;
