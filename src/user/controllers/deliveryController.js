const prisma = require('../prisma'); // Prisma client

// User creates a delivery
const createDelivery = async (req, res) => {
  const { address, totalPrice, tokoId } = req.body;
  const userId = req.user.id; // Dari token JWT

  try {
    const newDelivery = await prisma.delivery.create({
      data: {
        address,
        totalPrice,
        userId,
        tokoId,
        status: 'Pending',
      },
    });
    res.status(201).json(newDelivery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create delivery', details: error.message });
  }
};

// Seller updates delivery status
const updateDeliveryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const role = req.user.role;

  if (role !== 'seller') {
    return res.status(403).json({ error: 'Only sellers can update delivery status' });
  }

  try {
    const updatedDelivery = await prisma.delivery.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.status(200).json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update delivery status', details: error.message });
  }
};

// Get deliveries (for User or Seller)
const getDeliveries = async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role; // Dari JWT Token (user atau seller)

  try {
    if (role === 'user') {
      const deliveries = await prisma.delivery.findMany({
        where: { userId },
      });
      res.status(200).json(deliveries);
    } else if (role === 'seller') {
      const deliveries = await prisma.delivery.findMany({
        where: { toko: { sellerId: userId } }, // Seller menggunakan ID yang sama dengan sellerId di Toko
      });
      res.status(200).json(deliveries);
    } else {
      res.status(403).json({ error: 'Invalid role' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve deliveries', details: error.message });
  }
};

module.exports = {
  createDelivery,
  updateDeliveryStatus,
  getDeliveries,
};
