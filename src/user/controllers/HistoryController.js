const { prisma } = require('../../utils/Prisma');

// Create transaction history for completed orders
const createHistory = async (req, res) => {
  const { orderId } = req.body; // Order ID from request body

  try {
    // Fetch order details including products, store (Toko), and user information
    const order = await prisma.order.findUnique({
      where: { orderId },
      include: {
        items: {
          include: {
            produk: {
              include: {
                toko: true, // Include the store (Toko) where the product came from
              },
            },
          },
        },
        user: true, // Include user details
      },
    });

    // Ensure the order exists and the status is 'Completed'
    if (!order || order.status !== 'Completed') {
      return res.status(400).json({ error: 'Order not found or is not completed.' });
    }

    // Prepare history data
    const historyData = order.items.map(item => ({
      orderId: order.orderId,
      produkTitle: item.produk.title,      // Product title
      tokoName: item.produk.toko.name,     // Store name
      quantity: item.quantity,              // Quantity of product
      price: item.price * item.quantity,    // Total price for that product
      userId: order.user.id,                // The user who made the order
      timestamp: new Date(),                // Transaction completion time
    }));

    // Insert transaction history for each item in the order
    await prisma.transactionHistory.createMany({
      data: historyData.map(data => ({
        orderId: data.orderId,
        status: 'Completed',
        timestamp: data.timestamp,
        produkTitle: data.produkTitle,
        tokoName: data.tokoName,
        quantity: data.quantity,
        price: data.price,
        userId: data.userId, // Associate the transaction with the user
      })),
    });

    res.status(200).json({ message: 'Transaction history created successfully.' });
  } catch (error) {
    console.error('Error creating transaction history:', error);
    res.status(500).json({ error: 'An error occurred while creating transaction history.' });
  }
};

// Get all transaction histories
const getAllHistory = async (req, res) => {
  try {
    const histories = await prisma.transactionHistory.findMany({
      include: {
        order: true, // Include the order details
        user: true,  // Include the user who placed the order
      },
    });
    res.status(200).json(histories);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).json({ error: 'An error occurred while fetching transaction history.' });
  }
};

// Get transaction history by ID
const getHistoryById = async (req, res) => {
  const { id } = req.params; // Transaction history ID from URL params

  try {
    const history = await prisma.transactionHistory.findUnique({
      where: { id: parseInt(id) }, // Ensure ID is an integer
      include: {
        order: true, // Include order details
        user: true,  // Include user who placed the order
      },
    });

    if (!history) {
      return res.status(404).json({ error: 'Transaction history not found.' });
    }

    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching transaction history by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching transaction history by ID.' });
  }
};

// Get transaction history by Toko ID
const getHistoryByTokoId = async (req, res) => {
  const { tokoId } = req.params; // Toko ID from URL params

  try {
    const histories = await prisma.transactionHistory.findMany({
      where: { tokoId }, // Fetch history by Toko ID
      include: {
        order: true, // Include order details
        user: true,  // Include user who placed the order
      },
    });

    if (histories.length === 0) {
      return res.status(404).json({ error: 'No transaction history found for this toko.' });
    }

    res.status(200).json(histories);
  } catch (error) {
    console.error('Error fetching transaction history by Toko ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching transaction history by Toko ID.' });
  }
};

// Get transaction history by month and group by year
const getHistoryByMonth = async (req, res) => {
  const { month, year } = req.params; // Month and year from URL params

  try {
    // Convert month and year to a date range
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    // Fetch all histories within the specified month
    const histories = await prisma.transactionHistory.findMany({
      where: {
        timestamp: {
          gte: startDate, // Greater than or equal to start of the month
          lt: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1), // Less than start of next month
        },
      },
      include: {
        order: true, // Include order details
        user: true,  // Include user who placed the order
      },
    });

    // Group the fetched histories by year and month
    const groupedHistories = histories.reduce((group, history) => {
      const date = new Date(history.timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Get month from 1-12

      // Create a key for the group based on year and month
      const key = `${year}-${month.toString().padStart(2, '0')}`;

      if (!group[key]) {
        group[key] = [];
      }

      group[key].push(history);
      return group;
    }, {});

    // Check if we have any data
    if (Object.keys(groupedHistories).length === 0) {
      return res.status(404).json({ error: 'No transaction history found for this month.' });
    }

    res.status(200).json(groupedHistories);
  } catch (error) {
    console.error('Error fetching transaction history by month and year:', error);
    res.status(500).json({ error: 'An error occurred while fetching transaction history by month and year.' });
  }
};

module.exports = { createHistory, getAllHistory, getHistoryById, getHistoryByTokoId, getHistoryByMonth };
