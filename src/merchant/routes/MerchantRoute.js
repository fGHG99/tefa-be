// routes/merchantRoutes.js
const express = require('express');
const MerchantController = require('../controllers/MerchantController');
const MerchantMiddleware = require('../middlewares/Middleware');

const router = express.Router();

router.post('/create',  MerchantMiddleware.verifyMerchant, MerchantController.createToko);

// Rute untuk profil merchant
router.get('/profile',  MerchantMiddleware.verifyMerchant, MerchantController.getMerchantProfile);

// Rute untuk dashboard merchant
router.get('/dashboard', MerchantMiddleware.verifyMerchant, MerchantController.getMerchantDashboard);

// Rute untuk validasi QR Code
router.post('/validate-qr', MerchantMiddleware.verifyMerchant, MerchantController.validateQRCode);

// Rute untuk mengambil riwayat pesanan
router.get('/order-history', MerchantMiddleware.verifyMerchant, MerchantController.getOrderHistory);

// Rute untuk pembaruan notifikasi pesanan
router.put('/order-notifications/:orderId', MerchantMiddleware.verifyMerchant, MerchantController.updateOrderNotifications);

// Rute untuk manajemen pengiriman
router.post('/delivery', MerchantMiddleware.verifyMerchant, MerchantController.manageDelivery);

// Rute untuk manajemen produk
router.post('/products', MerchantMiddleware.verifyMerchant, MerchantController.manageProducts);

// Rute untuk pembaruan stok
router.put('/update-stock', MerchantMiddleware.verifyMerchant, MerchantController.updateStock);

module.exports = router;
