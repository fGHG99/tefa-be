// src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/middleware');

// Rute untuk membuat chat room (dilindungi autentikasi)
router.post('/create', authMiddleware.protect, chatController.createChatRoom);

// Rute untuk mengirim pesan (dilindungi autentikasi)
router.post('/send', authMiddleware.protect, chatController.sendMessage);

// Rute untuk mendapatkan pesan dari chat room tertentu
router.get('/messages/:chatRoomId', authMiddleware.protect, chatController.getMessages);

module.exports = router;