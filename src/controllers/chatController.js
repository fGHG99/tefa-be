// src/controllers/chatController.js
const chatService = require('../services/chatService');

// Membuat chat room
const createChatRoom = async (req, res) => {
  try {
    const { buyerId, sellerId, produkId } = req.body;  // Data untuk membuat chat room
    const chatRoom = await chatService.createChatRoom(buyerId, sellerId, produkId);
    res.status(201).json(chatRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mengirim pesan
const sendMessage = async (req, res) => {
  try {
    const { chatRoomId, senderId, receiverId, content } = req.body;  // Data untuk mengirim pesan
    const message = await chatService.sendMessage(chatRoomId, senderId, receiverId, content);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan pesan dari chat room tertentu
const getMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const messages = await chatService.getMessages(chatRoomId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChatRoom,
  sendMessage,
  getMessages,
};