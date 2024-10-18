const express = require('express');
const { getStore } = require('../controllers/StoreController');
const router = express.Router();

router.get('/', getStore);

module.exports = router;
