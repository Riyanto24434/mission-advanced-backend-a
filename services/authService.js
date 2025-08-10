// services/authService.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET_KEY || 'mock-secret', {
    expiresIn: '1h'
  });
};

module.exports = { generateToken };