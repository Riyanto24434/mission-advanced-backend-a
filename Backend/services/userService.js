const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const { sendVerificationEmail } = require('./emailService');

const registerUser = async (userData) => {
  const verificationToken = uuidv4();
  const tokenExpiry = new Date(Date.now() + 3600000); // 1 jam expiry
  const user = await User.create({
    ...userData,
    verificationToken
  });

  // Send verification email
  await sendVerificationEmail(user.email, verificationToken);

  return user;
};

const verifyUserEmail = async (token) => {
  const user = await User.findOne({ where: { verificationToken: token } });
  
  if (!user) {
    throw new Error('Invalid verification token');
  }

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();

  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  
  if (!user) {
    throw new Error('User not found');
  }

  if (!user.isVerified) {
    throw new Error('Please verify your email first');
  }

  const isPasswordValid = await require('bcrypt').compare(password, user.password);
  
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return user;
};

module.exports = {
  registerUser,
  verifyUserEmail,
  loginUser
};