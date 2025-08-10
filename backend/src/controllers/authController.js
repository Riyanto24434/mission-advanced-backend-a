const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const pool = require('../models/db');
const sendMail = require('../utils/sendMail');

// Register
exports.register = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    // check email exists
    const [exists] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (exists.length > 0) return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const token = uuidv4();
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    await pool.query(
      'INSERT INTO users (fullname, username, email, password, verification_token, token_expires_at) VALUES (?, ?, ?, ?, ?, ?)',
      [fullname, username, email, hashed, token, tokenExpires]
    );

    const preview = await sendMail(email, token);
    return res.status(201).json({ message: 'Registered. Check verification email.', previewUrl: preview });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: 'Token required' });

    const [rows] = await pool.query('SELECT id, token_expires_at FROM users WHERE verification_token = ?', [token]);
    if (rows.length === 0) return res.status(400).json({ message: 'Invalid verification token' });

    const user = rows[0];
    if (user.token_expires_at && new Date(user.token_expires_at) < new Date()) {
      return res.status(400).json({ message: 'Verification token expired' });
    }

    await pool.query('UPDATE users SET is_verified = 1, verification_token = NULL, token_expires_at = NULL WHERE id = ?', [user.id]);
    return res.json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const user = rows[0];
    if (!user.is_verified) return res.status(403).json({ message: 'Please verify your email first' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

    return res.json({ token, user: { id: user.id, fullname: user.fullname, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
