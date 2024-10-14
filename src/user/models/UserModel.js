const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Check if user exists by ID
async function isExist(id) {
  return await prisma.user.findUnique({ where: { id } });
}


module.exports = {
  isExist,
};