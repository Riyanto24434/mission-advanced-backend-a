const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getCourses } = require('../controllers/courseController');

router.get('/', auth, getCourses);

module.exports = router;
