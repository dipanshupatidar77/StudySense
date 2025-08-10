 //const LibraryFile = require('../models/LibraryFile');

// exports.uploadFile = async (req, res) => {
//   try {
//     const file = new LibraryFile({
//       filename: req.file.filename,
//       originalname: req.file.originalname,
//       url: req.file.path,   // Cloudinary URL
//       size: req.file.size,
//       uploadedBy: req.user ? req.user._id : null,
//     });

//     await file.save();
//     res.status(201).json({ success: true, file });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getAllFiles = async (req, res) => {
//   try {
//     const files = await LibraryFile.find().sort({ createdAt: -1 });
//    res.status(200).json({ files }); // ✅ wrap it in an object

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



//const LibraryFile = require('../models/File');
//  Upload new file
// exports.uploadFileController = async (req, res) => {
//   try {
//     const file = new LibraryFile({
//       filename: req.file.filename,
//       originalname: req.file.originalname,
//       //  ensure secure URL is saved (important!)
//       url: req.file.secure_url || req.file.path,
//       user: req.userId,
//     });

//     await file.save();
//     res.status(201).json({ success: true, message: "File uploaded", file });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Upload failed" });
//   }
// };

// exports.uploadFileController = async (req, res) => {
//   try {
//     console.log("Cloudinary file info:", req.file);
    
//     console.log("Uploaded file URL:", req.file.path); // ✅ works for raw files

//     const file = new LibraryFile({
//       filename: req.file.filename,
//       originalname: req.file.originalname,
//       //url: req.file.secure_url || req.file.path,  // ✅ raw resource Cloudinary URL expected
//       url: req.file.path, // Always use `path` for raw PDFs

//       size: req.file.size,
//       user: req.userId,
//     });

//     await file.save();
//     res.status(201).json({ success: true, message: "File uploaded", file });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Upload failed" });
//   }
// };


// // ✅ Get all files
// exports.getAllFilesController = async (req, res) => {
//   try {
//     const files = await LibraryFile.find({ user: req.userId });
//     res.status(200).json({ success: true, files });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Error getting files" });
//   }
// };



// const File = require('../models/File');
// const cloudinary = require("../config/cloudinary"); 
// const uploadPdf = async (req, res) => {
//   try {
//     console.log("🔁 Request Received");
//     console.log("File Object:", req.file);

//     if (!req.file || !req.file.path) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // ✅ Multer-Cloudinary already uploaded the file
//     const newFile = new File({
//       originalname: req.file.originalname,
//       url: req.file.path,           // already contains secure Cloudinary URL
//       size: req.file.size
//     });

//     await newFile.save();
//     console.log("✅ File saved to MongoDB");

//     res.status(200).json({ message: "File uploaded successfully", url: req.file.path });
//   } catch (error) {
//     console.error("❌ Upload Error", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };


// const getAllPDFs = async (req, res) => {
//   try {
//     const files = await File.find().sort({ createdAt: -1 }); // latest first
//     console.log("🧪 Response from /files route:", res.data);
//     res.status(200).json(files);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch files" });
//     console.error("❌ Error while fetching files", err);
//   }
// };

// const getAllPDFs = async () => {
//   try {
//    const files = await File.find().sort({ createdAt: -1 });  ✅✅✅

//     console.log("🧪 Response from /files:", res.data);
//     const myFiles = res.data || [];
//     setFiles(myFiles.reverse());
//   } catch (err) {
//     console.error("❌ Error while fetching files", err);
//   }
// };


// module.exports = {uploadPdf , getAllPDFs };


const cloudinary = require("../config/cloudinary");
const File = require('../models/File');

const uploadPdf = async (req, res) => {
  try {
    const { originalname, mimetype, size, path, filename } = req.file;

    const file = new File({
      originalname,
      mimetype,
      size,
      url: path,
      filename,
    });

    await file.save();

    console.log("✅ File saved to MongoDB");
    res.status(201).json({ message: "File uploaded successfully", file });
  } catch (error) {
    console.error("❌ Upload Error", error);
    res.status(500).json({ error: "File upload failed" });
  }
};

// const getAllPDFs = async (req, res) => {
//   try {
//     const files = await File.find().sort({ createdAt: -1 }); // Correct line ✅
//     res.status(200).json({ files });
//   } catch (error) {
//     console.error("❌ Error while fetching files", error);
//     res.status(500).json({ error: "Failed to fetch files" });
//   }
// };

const getAllPDFs = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.status(200).json({ files });
  } catch (error) {
    console.error("❌ Error while fetching files", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
};

module.exports = { uploadPdf, getAllPDFs };
