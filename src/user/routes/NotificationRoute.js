// routes/notificationRoute.js
const express = require('express');
const notificationController = require('../controllers/notificationController');
const router = express.Router();

// Mendapatkan semua notifikasi yang belum dibaca untuk pengguna tertentu
router.get('/notifications/:userId', notificationController.getUnreadNotifications);

// Menandai notifikasi sebagai sudah dibaca
router.patch('/notifications/:notificationId/read', notificationController.markAsRead);

module.exports = router;
