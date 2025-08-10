const pool = require('../models/db');

exports.getCourses = async (req, res) => {
  try {
    const { topic, sort, search, page = 1, limit = 10 } = req.query;
    let sql = 'SELECT * FROM courses WHERE 1=1';
    const params = [];

    if (topic) {
      sql += ' AND topic = ?';
      params.push(topic);
    }
    if (search) {
      sql += ' AND title LIKE ?';
      params.push(`%${search}%`);
    }

    // sorting example: sort=price_desc or sort=created_at_asc
    if (sort) {
      const [field, dir] = sort.split('_');
      const allowedFields = ['title', 'price', 'created_at'];
      const allowedDir = ['asc', 'desc'];
      if (allowedFields.includes(field) && allowedDir.includes(dir)) {
        sql += ` ORDER BY ${field} ${dir.toUpperCase()}`;
      }
    } else {
      sql += ' ORDER BY created_at DESC';
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit, 10), (parseInt(page, 10) - 1) * parseInt(limit, 10));

    const [rows] = await pool.query(sql, params);
    return res.json({ data: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
