// controllers/notificationController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Membuat notifikasi baru
exports.createNotification = async (userId, message) => {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        message
      }
    });
    return notification;
  } catch (error) {
    console.error('Failed to create notification', error);
    throw new Error('Failed to create notification');
  }
};

// Mendapatkan notifikasi yang belum dibaca
exports.getUnreadNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: userId,
        read: false
      }
    });

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

// Tandai notifikasi sebagai sudah dibaca
exports.markAsRead = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const updatedNotification = await prisma.notification.update({
      where: { id: parseInt(notificationId) },
      data: {
        read: true
      }
    });

    res.status(200).json({ updatedNotification });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
};
