const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();// Import prisma client

// Mendapatkan semua transaction history
const getAllTransactionHistories = async (req, res) => {
  try {
    const transactionHistories = await prisma.transactionHistory.findMany({
      include: {
        order: true,
        user: true,
        toko: true,
        items: true
      }
    });
    res.json(transactionHistories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transaction history" });
  }
};

// Mendapatkan transaction history berdasarkan ID
const getTransactionHistoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const transactionHistory = await prisma.transactionHistory.findUnique({
      where: { id: parseInt(id) },
      include: {
        order: true,
        user: true,
        toko: true,
        items: true,
      },
    });

    if (!transactionHistory) {
      return res.status(404).json({ message: "Transaction history not found" });
    }

    res.json(transactionHistory);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transaction history by ID" });
  }
};

// Membuat transaction history setelah order completed
const createTransactionHistory = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: {
        user: true,
        toko: true,
        items: true,
      },
    });

    if (order.status === "Completed") {
      const transactionHistory = await prisma.transactionHistory.create({
        data: {
          orderId: order.id,
          userId: order.userId,
          tokoId: order.tokoId,
          status: order.status,
          items: {
            createMany: {
              data: order.items.map((item) => ({
                produkId: item.produkId,
                quantity: item.quantity,
                price: item.price,
              })),
            },
          },
        },
      });
      res.json(transactionHistory);
    } else {
      res.status(400).json({ message: "Order is not completed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating transaction history" });
  }
};

module.exports = {
  getAllTransactionHistories,
  getTransactionHistoryById,  // Export new function
  createTransactionHistory,
};
