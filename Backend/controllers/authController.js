// controllers/authController.js
const { StatusCodes } = require('http-status-codes');
const { registerUser, verifyUserEmail, loginUser } = require('../services/userService');
const { generateToken } = require('../services/authService');

// ✅ Helper: konsistensi response
const successResponse = (res, status, message, data = {}) => {
  return res.status(status).json({
    success: true,
    message,
    data
  });
};

const errorResponse = (res, status, message) => {
  return res.status(status).json({
    success: false,
    message
  });
};

// ✅ Register User
const register = async (req, res) => {
  try {
    const { fullname, username, password, email } = req.body;

    if (!fullname || !username || !password || !email) {
      return errorResponse(res, StatusCodes.BAD_REQUEST, 'All fields are required');
    }

    const user = await registerUser({ fullname, username, password, email });

    return successResponse(
      res,
      StatusCodes.CREATED,
      'User registered successfully. Please check your email for verification.',
      {
        id: user.id,
        username: user.username,
        email: user.email
      }
    );
  } catch (error) {
    return errorResponse(res, StatusCodes.BAD_REQUEST, error.message);
  }
};

// ✅ Verify Email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return errorResponse(res, StatusCodes.BAD_REQUEST, 'Verification token is required');
    }

    const user = await verifyUserEmail(token);

    return successResponse(res, StatusCodes.OK, 'Email verified successfully', {
      id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    return errorResponse(res, StatusCodes.BAD_REQUEST, error.message);
  }
};

// ✅ Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, StatusCodes.BAD_REQUEST, 'Email and password are required');
    }

    const user = await loginUser(email, password);
    const token = generateToken(user.id);

    return successResponse(res, StatusCodes.OK, 'Login successful', {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    return errorResponse(res, StatusCodes.UNAUTHORIZED, error.message);
  }
};

module.exports = {
  register,
  verifyEmail,
  login
};
