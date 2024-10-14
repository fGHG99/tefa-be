// routes/orderRoutes.js
const express = require('express');
const { createOrder, updateOrderStatus, completeOrder } = require('../controllers/OrderController');

const router = express.Router();

// Create a new order
router.post('/create', createOrder);

// Update order status (Pending -> Processing or Cancelled)
router.patch('/update-status', updateOrderStatus);  

// Complete order
router.patch('/complete', completeOrder);

module.exports = router;
