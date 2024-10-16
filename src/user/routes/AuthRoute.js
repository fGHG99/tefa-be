const express = require('express');
const { register, login, logout, refreshToken } = require('../controllers/AuthController');
const { protect, authorizeRoles } = require('../middlewares/Middleware'); 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.post('/refreshtoken', refreshToken);  // New refresh token endpoint

router.get('/', protect, (req, res) => {
  return res.status(200).json({ message: 'Authenticated', user: req.user });
});

module.exports = router;
