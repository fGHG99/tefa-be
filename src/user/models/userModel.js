const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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
      role: role || 'USER', // Default to USER if role is not provided
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
      orders: true,  // Include related orders if necessary
      cart: true,    // Include related cart if necessary
      favorites: true // Include related favorites if necessary
    },
  });
}

// Update a user
async function updateUser(id, data) {
  const user = await isUserExist(id);
  if (!user) throw new Error('User does not exist');

  // Hash the password if it's included in the data
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return await prisma.user.update({
    where: { id },
    data,
  });
}

// Check if user exists by ID
async function isUserExist(id) {
  return await prisma.user.findUnique({ where: { id } });
}

// Delete a user
async function deleteUser(id) {
  return await prisma.user.delete({
    where: { id },
  });
}

const logIn = async (body) => {
  const { email, password } = body;
  try {
    const user = await findUserByEmail(email);
    if (!user) throw new Error("Email tidak ditemukan!");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Password tidak sesuai");

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY_AUTH); // Include user ID and role in the token
    await prisma.refreshToken.create({ data: { token, userId: user.id } });
    delete user.password; // Remove password from the returned user object
    return { token, user };
  } catch (err) {
    throwError(err);
  }
};

const logOut = async (token) => {
  try {
    const existingToken = await prisma.refreshToken.findUnique({ where: { token } });
    if (!existingToken) throw new Error('Token tidak ada di database');
    return await prisma.refreshToken.delete({ where: { id: existingToken.id } });
  } catch (err) {
    throwError(err);
  }
};


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