const express = require('express');
const { scanQRCode } = require('../controllers/aScannerController');

const router = express.Router();

router.post('/scan', scanQRCode);

module.exports = router;