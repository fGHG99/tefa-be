const jwt = require('jsonwebtoken');
const { error } = require('../../utils/Helper');

// Middleware to verify JWT and authenticate user
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return error(res, 'Token not available', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return error(res, 'Invalid token!', 401);
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
