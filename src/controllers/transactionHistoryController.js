const prisma = require('../prisma');

// Create a new transaction history entry
exports.createTransactionHistory = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const transactionHistory = await prisma.transactionHistory.create({
      data: {
        orderId,
        status,
      },
    });

    res.status(201).json(transactionHistory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction history' });
  }
};

// Get transaction history by orderId
exports.getTransactionHistoryByOrderId = async (req, res) => {
  const { orderId } = req.params;

  try {
    const transactionHistories = await prisma.transactionHistory.findMany({
      where: { orderId: parseInt(orderId) },
    });

    res.status(200).json(transactionHistories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction history' });
  }
};
