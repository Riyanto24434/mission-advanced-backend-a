// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// // Register a new user
// router.post('/register', authController.register);

// // Verify email
// router.get('/verify-email', authController.verifyEmail);

// // Login user
// router.post('/login', authController.login);

// module.exports = router;



const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/verify-email
router.get('/verify-email', authController.verifyEmail);

module.exports = router;