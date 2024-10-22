  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  const createToko = async (req, res) => {
    const { name, desc, tokoType } = req.body;
    const ownerId = req.user.id; // Ambil ownerId dari middleware (req.user)
  
    try {
      const newToko = await prisma.toko.create({
        data: {
          name,
          desc,
          tokoType,
          ownerId, // Gunakan ownerId dari token
        },
      });
      res.status(201).json(newToko); // Kembalikan respons sukses
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Gagal membuat toko." });
    }
  };

  // Function to get merchant profile
  const getMerchantProfile = async (req, res) => {
    const userId = req.user?.id; // Menggunakan optional chaining

    if (!userId) {
      return res.status(401).json({ error: "User ID tidak ditemukan, silakan login." });
    }

    try {
      const merchant = await prisma.user.findUnique({
        where: { id: userId },
        include: { stores: true }, // Menyertakan toko yang dimiliki
      });

      if (!merchant) {
        return res.status(404).json({ error: "Merchant tidak ditemukan." });
      }

      res.json(merchant);
    } catch (error) {
      console.error(error); // Debug
      res.status(500).json({ error: "Gagal mengambil profil merchant." });
    }
  };

  // Function to get merchant dashboard
  const getMerchantDashboard = async (req, res) => {
    const { userId } = req;

    try {
      const dashboardData = await prisma.toko.findMany({
        where: { ownerId: userId },
        include: { produk: true, orders: true }, // Menyertakan produk dan pesanan terkait
      });
      res.json(dashboardData);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil data dashboard." });
    }
  };

  // Function to validate QR code
  const validateQRCode = async (req, res) => {
    const { qrCode } = req.body;

    try {
      const qrData = await prisma.qRCode.findUnique({
        where: { qrCodeUrl: qrCode },
      });

      if (!qrData || qrData.status === 'expired') {
        return res.status(400).json({ error: "QR Code tidak valid atau telah kadaluarsa." });
      }

      res.json({ message: "QR Code valid.", orderId: qrData.orderId });
    } catch (error) {
      res.status(500).json({ error: "Gagal memvalidasi QR Code." });
    }
  };

  // Function to get order history
  const getOrderHistory = async (req, res) => {
    const { userId } = req;

    try {
      const history = await prisma.history.findMany({
        where: { userId: userId },
        include: { order: true },
      });
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil riwayat pesanan." });
    }
  };

  // Function to update order notifications
  const updateOrderNotifications = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await prisma.order.update({
        where: { orderId: orderId },
        data: { status: "Processing" }, // Misalnya, memperbarui status pesanan
      });
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Gagal memperbarui notifikasi pesanan." });
    }
  };

  // Function to manage delivery
  const manageDelivery = async (req, res) => {
    // Implementasi manajemen pengiriman sesuai kebutuhan
  };

  // Function to manage products
  const manageProducts = async (req, res) => {
    // Implementasi manajemen produk sesuai kebutuhan
  };

  // Function to update stock
  const updateStock = async (req, res) => {
    const { produkId, quantity } = req.body;

    try {
      const updatedStock = await prisma.inventory.update({
        where: { produkId: produkId },
        data: { quantity: quantity },
      });
      res.json(updatedStock);
    } catch (error) {
      res.status(500).json({ error: "Gagal memperbarui stok." });
    }
  };

  // Exporting all functions
  module.exports = {
    createToko,
    getMerchantProfile,
    getMerchantDashboard,
    validateQRCode,
    getOrderHistory,
    updateOrderNotifications,
    manageDelivery,
    manageProducts,
    updateStock,
  };
