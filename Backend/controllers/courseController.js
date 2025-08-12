const Course = require('../models/Course');

const getAllCourses = async (req, res) => {
  try {
    const { search, sort, instructor, minDuration, maxDuration } = req.query;
    
    const where = {};
    const order = [];
    
    // Search filter
    if (search) {
      where.title = { [Sequelize.Op.like]: `%${search}%` };
    }
    
    // Instructor filter
    if (instructor) {
      where.instructor = instructor;
    }
    
    // Duration filter
    if (minDuration || maxDuration) {
      where.duration = {};
      if (minDuration) where.duration[Sequelize.Op.gte] = minDuration;
      if (maxDuration) where.duration[Sequelize.Op.lte] = maxDuration;
    }
    
    // Sorting
    if (sort) {
      const sortFields = sort.split(',');
      sortFields.forEach(field => {
        const [column, direction] = field.split(':');
        order.push([column, direction.toUpperCase()]);
      });
    } else {
      order.push(['createdAt', 'DESC']);
    }
    
    const courses = await Course.findAll({
      where,
      order
    });
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllCourses
};