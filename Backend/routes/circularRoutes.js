const express = require('express');
const multer = require('multer');
const Circular = require('../models/Circular');

const router = express.Router();

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Get all circulars
router.get('/', async (req, res) => {
  try {
    const circulars = await Circular.find();
    res.json(circulars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch circulars' });
  }
});

// Add new circular
router.post('/', upload.single('file'), async (req, res) => {
  const { date } = req.body; // Get date from request body
  const filePath = req.file.path; // Get the uploaded file path from Multer

  try {
    const circular = new Circular({ file: filePath, date });
    await circular.save();
    res.json(circular);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add circular' });
  }
});

module.exports = router;
