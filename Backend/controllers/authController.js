const { registerUser, verifyUserEmail, loginUser } = require('../services/userService');
const { generateToken } = require('../services/authService');

const register = async (req, res) => {
  try {
    const { fullname, username, password, email } = req.body;
    const user = await registerUser({ fullname, username, password, email });
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email for verification.',
      data: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await verifyUserEmail(token);
    
    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      data: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    const token = generateToken(user.id);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  register,
  verifyEmail,
  login
};