const { prisma } = require('../../utils/Prisma');

const getStore = async (req, res) => {
  try {
    const stores = await prisma.toko.findMany();  
    res.json(stores); 
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch toko data' });
  }
};

module.exports = { getStore };
