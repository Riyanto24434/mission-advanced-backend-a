const { verifyToken } = require('../services/authService');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticate };

// authMiddleware.js
/**
 * Middleware untuk autentikasi JWT
 * 1. Cek header Authorization
 * 2. Verifikasi token
 * 3. Lampirkan user object ke request
 */