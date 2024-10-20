const { prisma } = require('../../utils/Prisma');

const getStore = async (req, res) => {
  const { tokoType } = req.query; // Get tokoType from query parameters

  try {
    // If tokoType is provided and not "All", filter by tokoType, otherwise return all
    const stores = await prisma.toko.findMany({
      where: tokoType && tokoType !== 'All' ? { tokoType } : {},
    });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch toko data' });
  }
};

module.exports = { getStore };
