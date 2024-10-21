const { prisma } = require('../../utils/Prisma');
const bcrypt = require('bcrypt');

// Helper function for validation
function validateUserData(data) {
  const { email, password, name, role } = data;
  if (!email || !password || !name) {
    return 'Email, password, and name are required fields';
  }
  if (role && !['USER', 'MERCHANT', 'ADMIN', 'SUPER_ADMIN'].includes(role)) {
    return 'Invalid role provided';
  }
  return null;
}

// Create a new user (for admins to create new users)
async function createUser(req, res) {
  try {
    const { email, password, name, role } = req.body;

    // Validate input data
    const validationError = validateUserData(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const emailAlreadyExists = await prisma.user.findUnique({ where: { email } });
    if (emailAlreadyExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'USER', // Default role to 'USER' if not provided
      }
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
}

// Get all users (admin only)
async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      include: {
        cart: true,
        favorites: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
}

// Update user
async function updateUser(req, res) {
  const { id } = req.params;
  const data = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    // Validate input data if role is being changed
    if (data.role && !['USER', 'MERCHANT', 'ADMIN', 'SUPER_ADMIN'].includes(data.role)) {
      return res.status(400).json({ message: 'Invalid role provided' });
    }

    if (data.password) {
      if (data.password.trim() === '') {
        return res.status(400).json({ message: 'Password cannot be empty' });
      }
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
}

// Delete user
async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
}

// Applying middleware to each controller function
module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
