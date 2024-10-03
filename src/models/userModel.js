const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new user
async function createUser(data) {
  return await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: data.password, // Make sure to hash passwords before saving!
      role: data.role || 'USER',
    },
  });
}

// Find a user by email
async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      orders: true,  // Include related orders
      cart: true,    // Include related cart
    },
  });
}

// Get all users
async function getAllUsers() {
  return await prisma.user.findMany({
    include: {
      orders: true,
      cart: true,
    },
  });
}

// Update a user
async function updateUser(id, data) {
  return await prisma.user.update({
    where: { id: id },
    data: {
      email: data.email,
      name: data.name,
      password: data.password,  // Don't forget to hash the password if it's being changed
      role: data.role,
    },
  });
}

// Delete a user
async function deleteUser(id) {
  return await prisma.user.delete({
    where: { id: id },
  });
}

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
};
