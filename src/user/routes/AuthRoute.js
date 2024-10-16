const express = require('express');
const { register, login } = require('../controllers/AuthController');
const { protect } = require('../middlewares/Middleware'); 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// router.post('/logout', protect, logout);
router.get('/', protect, (req, res) => {
  return res.status(200).json({
    message: 'Authenticated',
    user: req.user,
    role: req.user.role // Make sure to include the role
  });
});

module.exports = router;
