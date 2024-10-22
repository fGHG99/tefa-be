const jwt = require('jsonwebtoken');
const { prisma } = require('../../utils/Prisma')

// Middleware untuk otentikasi merchant
const verifyMerchant = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Cek apakah Authorization header tersedia
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Token tidak ditemukan." });
  }

  const token = authHeader.split(' ')[1]; // Mengambil token setelah 'Bearer'

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    // Mencari user berdasarkan id yang didecode dari token
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    // Cek apakah user ada dan memiliki peran 'MERCHANT'
    if (!user || user.role !== 'MERCHANT') {
      return res.status(403).json({ error: "Akses ditolak. Bukan merchant." });
    }

    req.user = user; // Simpan informasi user di request
    next(); // Lanjut ke middleware atau controller
  } catch (error) {
    return res.status(403).json({ error: "Token tidak valid." });
  }
};

module.exports = {
  verifyMerchant,
};
