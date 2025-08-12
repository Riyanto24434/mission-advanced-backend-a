const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  instructor: {
    type: DataTypes.STRING
  },
  duration: {
    type: DataTypes.INTEGER
  },
  price: {
    type: DataTypes.DECIMAL(10, 2)
  }
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Course;