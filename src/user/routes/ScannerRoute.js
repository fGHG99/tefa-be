const express = require('express');
const { scanQRCode } = require('../controllers/ScannerController');

const router = express.Router();

router.post('/scan', scanQRCode);

module.exports = router;