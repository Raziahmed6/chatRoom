// routes/upload.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1691078456932.png
  },
});

const upload = multer({ storage });

// ✅ Upload route with path fix (for Windows)
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image not uploaded' });
    }

    const fixedPath = req.file.path.replace(/\\/g, '/'); // Windows fix
    res.json({ imageUrl: `http://localhost:5000/${fixedPath}` });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Failed to upload image' });
  }
});

module.exports = router;
