const express = require('express');
const sellerController = require('../controller/sellerController');
const { protect } = require('../middlewares/middleware'); // Adjust the path as necessary
const router = express.Router();

router.post('/add', sellerController.addSeller);
router.put('/update/:id', protect, sellerController.updateSeller);
router.delete('/delete/:id', protect, sellerController.deleteSeller);
router.get('/', protect, sellerController.getAllSellers);
router.get('/:id', protect, sellerController.getSellerById);

module.exports = router;
