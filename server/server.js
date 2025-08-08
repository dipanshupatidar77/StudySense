const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

const customChatRoutes = require("./routes/customChat");
app.use("/api/chat", customChatRoutes);

const normalChatRoutes = require("./routes/normalChat");
app.use("/api/chat", normalChatRoutes);

const quizRoute = require('./routes/quizRoute');
app.use('/api/quiz', quizRoute);

const libraryRoutes = require('./routes/libraryRoutes');
app.use('/api/library', libraryRoutes);

const codeRoutes = require('./routes/codeRoutes');
app.use('/api/compile', codeRoutes);

const todoRoutes = require('./routes/todo');
app.use('/api/todos', todoRoutes);


// DB and server start
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});


//mongodb://127.0.0.1:27017/TalkSense_AI

