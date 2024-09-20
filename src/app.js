const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const chatRoutes = require('./routes/chatRoute');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

// Tambahkan rute chat
app.use('/chat', chatRoutes);

// Socket.IO untuk chat real-time
io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('joinRoom', (chatRoomId) => {
    socket.join(chatRoomId);
    console.log(`User joined chat room: ${chatRoomId}`);
  });

  socket.on('sendMessage', (message) => {
    io.to(message.chatRoomId).emit('message', message);
    console.log('Message sent:', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});