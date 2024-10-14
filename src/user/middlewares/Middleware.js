const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Middleware to verify JWT and authenticate user
const protect = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Access denied, no token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check role is 'USER' and validate email domain if necessary
        if (user.role === 'USER') {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Attach user to request object for further use
        req.user = user;
        next();
    } catch (err) {
        return res.status(400).json({ error: 'Invalid token' });
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
