const { prisma } = require('../../utils/Prisma');

const getStore = async (req, res) => {
  const { tokoType } = req.query; // Get tokoType from query parameters

  try {
    const stores = await prisma.toko.findMany({
      where: tokoType ? { tokoType } : {},  // If tokoType is provided, filter, else get all
    });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch toko data' });
  }
};

module.exports = { getStore };
