const express = require('express');
const router = express.Router();
const {
  getAllTransactionHistories,
  getTransactionHistoryById,  // Import the new function
  createTransactionHistory
} = require('../controllers/histroyController');

// GET semua transaction history
router.get('/', getAllTransactionHistories);

// GET specific transaction history by ID
router.get('/:id', getTransactionHistoryById); // New route to fetch specific history

// POST untuk membuat transaction history setelah order completed
router.post('/create/:orderId', createTransactionHistory);

module.exports = router;