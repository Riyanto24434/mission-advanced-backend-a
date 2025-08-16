// services/userService.js
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/User');
const { sendVerificationEmail } = require('./emailService');

const TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 jam
const SALT_ROUNDS = 10;

/**
 * Register user baru
 * @param {Object} userData
 */
const registerUser = async (userData) => {
  // Hash password sebelum simpan
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

  const verificationToken = uuidv4();
  const tokenExpiry = new Date(Date.now() + TOKEN_EXPIRY_MS);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
    verificationToken,
    tokenExpiry,
    isVerified: false,
  });

  // Kirim email verifikasi
  await sendVerificationEmail(user.email, verificationToken);

  // Jangan return password
  const { password, ...safeUser } = user.get({ plain: true });
  return safeUser;
};

/**
 * Verifikasi email user dengan token
 * @param {string} token
 */
const verifyUserEmail = async (token) => {
  const user = await User.findOne({
    where: {
      verificationToken: token,
      tokenExpiry: { [Op.gt]: new Date() }, // cek expiry
    },
  });

  if (!user) {
    throw new Error('Invalid or expired verification token');
  }

  user.isVerified = true;
  user.verificationToken = null;
  user.tokenExpiry = null;
  await user.save();

  const { password, ...safeUser } = user.get({ plain: true });
  return safeUser;
};

/**
 * Login user dengan email & password
 * @param {string} email
 * @param {string} password
 */
const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.isVerified) {
    throw new Error('Please verify your email first');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Jangan return password
  const { password: _, ...safeUser } = user.get({ plain: true });
  return safeUser;
};

module.exports = {
  registerUser,
  verifyUserEmail,
  loginUser,
};
