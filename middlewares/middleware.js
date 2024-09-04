const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const middleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Additional validation for email based on role
        if (user.role === 'user' && !user.email.endsWith('.siswa@smkn4bdg.sch.id')) {
            return res.status(403).send({ error: 'Invalid email format for user role' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(400).send({ error: 'Invalid token' });
    }
};

module.exports = middleware;
