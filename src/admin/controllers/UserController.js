const prisma = require('../../utils/Prisma'); // Your Prisma client

// Get Admin Profile
const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id; // Since your id is a String (UUID)
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true 
      }
    });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json(admin);
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  getAdminProfile,
};