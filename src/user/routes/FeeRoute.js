// routes/configRoutes.js
const express = require('express');
const router = express.Router();
const { getAdminFee, updateAdminFee, setAdminFee } = require('../../admin/controllers/FeeController');

// Route to get the current admin fee
router.get('/get', getAdminFee);

// Route to update the admin fee
router.put('/update', updateAdminFee);

router.post('/create', setAdminFee);

module.exports = router;
