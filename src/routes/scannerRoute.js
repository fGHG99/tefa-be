// routes/scannerRoutes.js
const express = require('express');
const { scanQRCode } = require('../controllers/scannerController');

const router = express.Router();

// Route untuk memindai QR Code
router.post('/scan', scanQRCode);

module.exports = router;