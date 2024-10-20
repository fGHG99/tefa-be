const express = require('express');
const { register, login } = require('../controllers/AuthController');
const { protect } = require('../middlewares/Middleware'); 
const { prisma } = require("../../utils/Prisma"); 

const router = express.Router();

// Register and login routes
router.post('/register', register);
router.post('/login', login);
// router.post('/logout', protect, logout);

// Authentication check route
router.get('/', protect, (req, res) => {
  return res.status(200).json({
    message: 'Authenticated',
    user: req.user,
    role: req.user.role // Include the role if it exists
  });
});

// New route to get user role based on user ID
router.get('/users/:id/role', protect, async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }, // Only select the role
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ role: user.role });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
