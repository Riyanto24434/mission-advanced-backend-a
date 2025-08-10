const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { authenticate } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Upload file
router.post('/', authenticate, upload.single('file'), uploadController.upload);

module.exports = router;