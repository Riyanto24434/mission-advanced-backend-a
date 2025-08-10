const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const uploadRoutes = require('./routes/upload');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static serve uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// routes
app.use('/api', authRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/upload', uploadRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err.message) return res.status(400).json({ message: err.message });
  return res.status(500).json({ message: 'Server error' });
});

module.exports = app;
