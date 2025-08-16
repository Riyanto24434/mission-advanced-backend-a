// controllers/courseController.js
const { Op } = require('sequelize');
const Course = require('../models/Course');

const ALLOWED_SORT_FIELDS = ['title', 'duration', 'createdAt', 'instructor'];

const getAllCourses = async (req, res) => {
  try {
    const {
      search,
      sort,
      instructor,
      minDuration,
      maxDuration
    } = req.query;

    const where = {};
    const order = [];

    // 🔍 Search by title
    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    // 👨‍🏫 Filter by instructor
    if (instructor) {
      where.instructor = instructor;
    }

    // ⏳ Duration range filter
    if (minDuration || maxDuration) {
      where.duration = {};
      if (minDuration) where.duration[Op.gte] = parseInt(minDuration, 10);
      if (maxDuration) where.duration[Op.lte] = parseInt(maxDuration, 10);
    }

    // 🔽 Sorting (default: newest first)
    if (sort) {
      sort.split(',').forEach(field => {
        const [column, dir = 'asc'] = field.split(':');
        if (ALLOWED_SORT_FIELDS.includes(column)) {
          order.push([column, dir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']);
        }
      });
    }
    if (order.length === 0) {
      order.push(['createdAt', 'DESC']);
    }

    // 📦 Fetch from DB
    const courses = await Course.findAll({ where, order });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
      message: courses.length ? 'Courses retrieved successfully' : 'No courses found'
    });

  } catch (error) {
    console.error('Error fetching courses:', error); // log buat developer

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

module.exports = { getAllCourses };
