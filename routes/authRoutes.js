const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.register);

// Verify email
router.get('/verify-email', authController.verifyEmail);

// Login user
router.post('/login', authController.login);

module.exports = router;