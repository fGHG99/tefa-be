const express = require('express');
const router = express.Router();

// Define routes for transaction history here
router.get('/', (req, res) => {
  res.send('Transaction history route');
});

module.exports = router;
