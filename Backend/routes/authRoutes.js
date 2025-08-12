const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const authController = require('../controllers/authController');

// Register a new user dengan validasi
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
  ],
  authController.register
);

// Verify email
router.get('/verify-email', authController.verifyEmail);

// Login user
router.post('/login', authController.login);

module.exports = router;
