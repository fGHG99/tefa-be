const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

const generateAuthToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register
router.post('/register', async (req, res) => {
    const { email, name, password, role = 'user' } = req.body;

    try {
        // Email validation based on role
        if (role === 'user' && !email.endsWith('.siswa@smkn4bdg.sch.id')) {
            return res.status(400).send({ error: 'User must use a valid school email!' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(400).send({ error: 'User already exists' });
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
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(500).send({ error: 'Failed to register user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        // Email validation based on role
        if (user.role === 'user' && !email.endsWith('.siswa@smkn4bdg.sch.id')) {
            return res.status(400).send({ error: 'User email must contain ".siswa@smkn4bdg.sch.id"' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const token = generateAuthToken(user);
        res.send({ user, token });
    } catch (err) {
        res.status(500).send({ error: 'Failed to login user' });
    }
});

module.exports = router;
