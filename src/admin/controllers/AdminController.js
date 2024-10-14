const { prisma } = require('../../utils/Prisma');
const bcrypt = require('bcrypt');

// Create a new user (for admins to create new users)
async function createUser(req, res) {
  try {
    const { email, password, name, role } = req.body; // Assume admin provides these in the request body

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
        role: role || 'USER' // Default role to 'USER' if not provided
      }
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
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
    res.status(500).json({ message: 'Error fetching users', error });
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

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
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
    res.status(500).json({ message: 'Error deleting user', error });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
};
