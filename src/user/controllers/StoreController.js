const { prisma } = require('../../utils/Prisma');

const getStore = async (req, res) => {
  try {
    const tokos = await prisma.toko.findMany();  // Fetch toko data from the database
    res.json(tokos);  // Send it as JSON response
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch toko data' });
  }
};

module.exports = { getStore };
