const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to add item to the cart
router.post('/cart', cartController.addItemToCart);

module.exports = router;
