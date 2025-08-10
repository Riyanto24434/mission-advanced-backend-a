// controllers/courseController.js
const db = require('../services/mockDB');

const getAllCourses = (req, res) => {
  const { search, sort, instructor } = req.query;
  let courses = [...db.courses];
  
  // Implement filter/search
  if (search) {
    courses = courses.filter(c => 
      c.title.includes(search) || 
      c.description.includes(search)
  }
  
  // Implement sorting
  if (sort === 'title') {
    courses.sort((a, b) => a.title.localeCompare(b.title))
  }
  
  res.json(courses);
}

module.exports = { getAllCourses }