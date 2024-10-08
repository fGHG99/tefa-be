const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to add item to the cart
router.post('/add', cartController.addItemToCart);

router.post('/checkout', cartController.checkout);

router.get('/:userId/:cartId', cartController.getCart);

module.exports = router;
