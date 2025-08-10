const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middlewares/auth');
const { uploadFile } = require('../controllers/uploadController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

function fileFilter(req, file, cb) {
  const allowed = ['.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowed.includes(ext)) return cb(new Error('Only images allowed'));
  cb(null, true);
}

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter });

router.post('/', auth, upload.single('file'), uploadFile);

module.exports = router;
