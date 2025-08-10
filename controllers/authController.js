// const { registerUser, verifyUserEmail, loginUser } = require('../services/userService');
// const { generateToken } = require('../services/authService');

// const register = async (req, res) => {
//   try {
//     const { fullname, username, password, email } = req.body;
//     const user = await registerUser({ fullname, username, password, email });
    
//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully. Please check your email for verification.',
//       data: {
//         id: user.id,
//         username: user.username,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// const verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.query;
//     const user = await verifyUserEmail(token);
    
//     res.status(200).json({
//       success: true,
//       message: 'Email verified successfully',
//       data: {
//         id: user.id,
//         username: user.username,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await loginUser(email, password);
//     const token = generateToken(user.id);
    
//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       data: {
//         token,
//         user: {
//           id: user.id,
//           username: user.username,
//           email: user.email
//         }
//       }
//     });
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// module.exports = {
//   register,
//   verifyEmail,
//   login
// };




const db = require('../services/mockDB');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const { fullname, username, password, email } = req.body;
    
    // Validasi input
    if (!fullname || !username || !password || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Cek jika username/email sudah ada
    const userExists = db.users.some(user => 
      user.username === username || user.email === email
    );
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Buat user baru
    const newUser = {
      id: uuidv4(),
      fullname,
      username,
      password: hashedPassword,
      email,
      verificationToken: uuidv4(),
      isVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Simpan ke mock database
    db.users.push(newUser);
    
    // Response tanpa password
    const userResponse = {
      id: newUser.id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      isVerified: newUser.isVerified,
      createdAt: newUser.createdAt
    };
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Cari user by email
    const user = db.users.find(user => user.email === email);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Buat response tanpa password
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified
    };
    
    // Dalam implementasi real, generate JWT token
    const token = 'mock-jwt-token';
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: userResponse
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  register,
  login
};



const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    
    // Cari user by token
    const user = db.users.find(user => user.verificationToken === token);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }
    
    // Update status verifikasi
    user.isVerified = true;
    user.verificationToken = null;
    user.updatedAt = new Date().toISOString();
    
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
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Tambahkan ke exports
module.exports = {
  register,
  login,
  verifyEmail
};