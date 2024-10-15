const { throwError } = require("../../utils/Helper");
const { prisma } = require("../../utils/Prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getRefreshTokenExpiryDate = () => {
    const now = new Date();
    now.setDate(now.getDate() + 7); // Adds 7 days to current date
    return now;
  };

const createAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

// Register
router.post('/register', async (req, res) => {
    const { email, name, password, role = 'USER' } = req.body;

    try {
        if (role === 'USER' && !email.endsWith('.siswa@smkn4bdg.sch.id')) {
            return res.status(400).json({ error: 'User must use a valid school email!' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role,
            },
        });

        const token = generateAuthToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store the refresh token in the database
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        });

        res.status(201).json({ user, token, refreshToken });
    } catch (err) {
        // Log the error details
        console.error('Registration error:', {
            message: err.message,
            stack: err.stack,
            details: err, // This logs the entire error object
        });

        res.status(500).json({ error: 'Failed to register user' });
    }
});


// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email not found!" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    const expiresAt = getRefreshTokenExpiryDate();

    await prisma.token.create({ data: { token: refreshToken, userId: user.id, expiresAt: expiresAt,  } });

    res.status(200).json({ message: "Login successful", accessToken, refreshToken });
  } catch (err) {
    throwError(err, res);
  }
};

// Logout (Protected)
const logout = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    // Check if refresh token exists in the database
    const tokenRecord = await prisma.token.findFirst({ where: { token: refreshToken } });
    if (!tokenRecord) return res.status(404).json({ message: " token not found in the database" });

    // Delete the refresh token from the database
    await prisma.token.delete({ where: { id: tokenRecord.id } });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    throwError(err, res);
  }
};

module.exports = { register, login, logout };
