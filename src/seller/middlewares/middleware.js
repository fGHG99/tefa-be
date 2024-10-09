const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Middleware untuk melindungi rute seller
const protect = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Cek apakah token ada
    if (!token) {
        return res.status(401).send({ error: 'Access denied, no token provided' });
    }

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Mencari pengguna berdasarkan ID yang terdekripsi
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        // Cek jika pengguna tidak ditemukan
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        
        // Cek jika pengguna bukan seller
        if (user.role !== 'seller') {
            return res.status(403).send({ error: 'Access denied, insufficient permissions' });
        }

        // Menyimpan informasi pengguna ke dalam req
        req.user = user;
        next(); // Melanjutkan ke rute berikutnya
    } catch (err) {
        res.status(400).send({ error: 'Invalid token' });
    }
};

module.exports = { protect };
