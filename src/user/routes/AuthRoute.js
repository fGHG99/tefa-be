const express = require('express');
const { register, login, logout } = require('../controllers/AuthController');
const { protect } = require('../middlewares/Middleware'); 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout); // Apply 'protect' middleware to logout

module.exports = router;
