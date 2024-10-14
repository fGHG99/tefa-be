const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const { protect, authorizeRoles } = require('../middlewares/Middleware');

// Route to add item to the cart
router.post('/add',protect, authorizeRoles('USER'), cartController.addItemToCart);

router.post('/checkout',protect, authorizeRoles('USER'), cartController.checkout);

router.get('/:userId/:cartId',protect, authorizeRoles('USER'), cartController.getCart);

module.exports = router;
