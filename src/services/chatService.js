// src/services/chatService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Membuat chat room baru
const createChatRoom = async (buyerId, sellerId, produkId) => {
  const chatRoom = await prisma.chatRoom.create({
    data: {
      users: {
        connect: [{ id: buyerId }, { id: sellerId }]
      },
      produk: { connect: { id: produkId } }
    }
  });
  return chatRoom;
};

// Mengirim pesan baru
const sendMessage = async (chatRoomId, senderId, receiverId, content) => {
  const message = await prisma.message.create({
    data: {
      content,
      sender: { connect: { id: senderId } },
      receiver: { connect: { id: receiverId } },
      chatRoom: { connect: { id: chatRoomId } }
    }
  });
  return message;
};

// Mendapatkan semua pesan dari chat room tertentu
const getMessages = async (chatRoomId) => {
  const messages = await prisma.message.findMany({
    where: { chatRoomId },
    orderBy: { createdAt: 'asc' }  // Urutkan pesan berdasarkan waktu
  });
  return messages;
};

module.exports = {
  createChatRoom,
  sendMessage,
  getMessages,
};