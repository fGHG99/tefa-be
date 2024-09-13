const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

const generateAuthToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' }); // Access token expires in 15 minutes
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' }); // Refresh token expires in 7 days
};

// Register
router.post('/register', async (req, res) => {
    const { email, name, password, role = 'USER' } = req.body;

    try {
        if (role === 'USER' && !email.endsWith('.siswa@smkn4bdg.sch.id')) {
            return res.status(400).json({ error: 'User must use a valid school email!' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role,
            },
        });

        const token = generateAuthToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(201).json({ user, token, refreshToken });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        if (user.role === 'user' && !email.endsWith('.siswa@smkn4bdg.sch.id')) {
            return res.status(400).json({ error: 'User email must contain ".siswa@smkn4bdg.sch.id"' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        const token = generateAuthToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({ user, token, refreshToken });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Failed to login user' });
    }
});

// Refresh Token
router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const token = generateAuthToken(user);
        res.json({ token });
    } catch (err) {
        console.error('Refresh token error:', err);
        res.status(401).json({ error: 'Invalid refresh token' });
    }
});

module.exports = router;
