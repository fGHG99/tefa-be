const express = require('express');
const { createDelivery, updateDeliveryStatus, getDeliveries } = require('../controllers/deliveryController');
const router = express.Router();
const { authMiddleware } = require('../middlewares/middleware');

// Routes
router.post('/create', authMiddleware, createDelivery); // User create a delivery
router.patch('/:id/status', authMiddleware, updateDeliveryStatus); // Seller updates delivery status
router.get('/', authMiddleware, getDeliveries); // Get deliveries for User or Seller

module.exports = router;
