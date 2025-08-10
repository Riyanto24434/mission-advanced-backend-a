const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate } = require('../middlewares/authMiddleware');

// Get all courses with filtering and sorting
router.get('/', authenticate, courseController.getAllCourses);

module.exports = router;