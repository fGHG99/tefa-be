const { prisma } = require('../../utils/Prisma');
const bcrypt = require('bcrypt');

// Create a new user
async function createUser(data) {
  const { email, password, name, role } = data; // Added role as an optional field

  const emailAlreadyExists = await findUserByEmail(email);
  if (emailAlreadyExists) throw new Error('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: role , // Default to USER if role is not provided
    },
  });
}

// Find a user by email
async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

// Get all users
async function getAllUsers() {
  return await prisma.user.findMany({
    include: {  
      cart: true,    
      favorites: true 
    },
  });
}

async function updateUser(id, data) {
  const user = await isUserExist(id);
  if (!user) throw new Error('User does not exist');

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return await prisma.user.update({
    where: { id },
    data,
  });
}

async function isUserExist(id) {
  return await prisma.user.findUnique({ where: { id } });
}

async function deleteUser(id) {
  return await prisma.user.delete({
    where: { id },
  });
}


module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  updateUser,
  isUserExist,
  deleteUser,
  logIn,
  logOut
};