const mongoose = require('mongoose');

const LibraryFileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  url: String,
  size: Number,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // optional: only if login system exists
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LibraryFile', LibraryFileSchema);
