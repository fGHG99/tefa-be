const { prisma } = require('../../utils/aPrisma');

const getAdminFee = async (req, res) => {
  try {
    const config = await prisma.config.findUnique({ where: { key: 'adminFee' } });
    if (!config) {
      return res.status(404).json({ error: 'Admin fee configuration not found' });
    }
    res.status(200).json({ adminFee: config.value });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching admin fee' });
  }
};

// Create or update the admin fee in the database
const setAdminFee = async (req, res) => {
  const { key, value } = req.body;

  // Validate request body
  if (!key || value === undefined || isNaN(value)) {
    return res.status(400).json({ error: 'Invalid key or admin fee' });
  }

  try {
    const existingConfig = await prisma.config.findUnique({ where: { key } });

    if (existingConfig) {
      // If the admin fee already exists, update it
      const updatedConfig = await prisma.config.update({
        where: { key },
        data: { value }
      });
      return res.status(200).json({ message: 'Admin fee updated successfully', updatedConfig });
    } else {
      // If the admin fee doesn't exist, create a new record
      const newConfig = await prisma.config.create({
        data: { key, value }
      });
      return res.status(201).json({ message: 'Admin fee created successfully', newConfig });
    }
  } catch (error) {
    console.error('Error in setAdminFee:', error); // Log the error
    res.status(500).json({ error: 'Error creating or updating admin fee' });
  }
};


// Update the admin fee in the database (similar to createAdminFee, but just for clarity)
const updateAdminFee = async (req, res) => {
  const { adminFee } = req.body;

  if (adminFee === undefined || isNaN(adminFee)) {
    return res.status(400).json({ error: 'Invalid admin fee' });
  }

  try {
    const updatedConfig = await prisma.config.upsert({
      where: { key: 'adminFee' },
      update: { value: adminFee },
      create: { key: 'adminFee', value: adminFee }
    });
    res.status(200).json({ message: 'Admin fee updated successfully', updatedConfig });
  } catch (error) {
    res.status(500).json({ error: 'Error updating admin fee' });
  }
};

module.exports = {
  getAdminFee,
  setAdminFee,
  updateAdminFee,
};
