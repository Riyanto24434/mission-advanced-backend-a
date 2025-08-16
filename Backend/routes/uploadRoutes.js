const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { upload, handleUploadErrors } = require('../middlewares/uploadMiddleware');
const uploadController = require('../controllers/uploadController');

router.post(
  '/',
  authenticate,
  upload.single('file'),
  handleUploadErrors, // tangani error multer & tipe file
  uploadController.uploadFile
);

module.exports = router;
