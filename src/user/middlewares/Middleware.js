const jwt = require('jsonwebtoken');
const { error } = require('../../utils/Helper');

// Middleware to verify JWT and authenticate user
const protect = async (req, res, next) => {
    try {
      const token = req.headers['authorization'];
  
      if (!token) {
        return error(res, 'Token tidak tersedia!', 401);
      }
  
      // Verify token synchronously
      const decoded = jwt.verify(token, process.env.SECRET_KEY_AUTH);
      req.user = decoded;
      next(); // Continue to the next middleware or route handler
    } catch (err) {
      return error(res, 'Token tidak valid!', 401);
    }
  };

// Middleware for role-based authorization (generic for multiple roles)
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: `Access denied, only ${allowedRoles.join(', ')} are allowed` });
      }
      next();
    };
  };

module.exports = { protect, authorizeRoles };
