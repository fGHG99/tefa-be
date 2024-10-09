// routes/orderRoutes.js
const express = require('express');
const { createOrder, updateOrderStatus, markOrderReady, completeOrder } = require('../controllers/orderController');

const router = express.Router();

// Create a new order
router.post('/create', createOrder);

// Update order status (Pending -> Processing or Cancelled)
router.patch('/update-status', updateOrderStatus);

// Mark order as ready
router.patch('/ready', markOrderReady);

// Complete order
router.patch('/complete', completeOrder);

module.exports = router;
