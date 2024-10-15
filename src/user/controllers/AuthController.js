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
const register = async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const emailAlreadyExist = await prisma.user.findFirst({ where: { email } });
      if (emailAlreadyExist) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: { email, password: hashedPassword, name, role: "USER" },
      });
  
      const accessToken = createAccessToken(newUser);
      const refreshToken = createRefreshToken(newUser);
      const expiresAt = getRefreshTokenExpiryDate();
  
      // Save refresh token and expiration date in the Token table
      try {
        await prisma.token.create({
          data: {
            token: refreshToken,
            userId: newUser.id,
            expiresAt: expiresAt, // Set the calculated expiration date
          },
        });
  
        // Update the user's refreshToken field
        await prisma.user.update({
          where: { id: newUser.id },
          data: { refreshToken: refreshToken },
        });
      } catch (tokenError) {
        console.error("Error creating token in the database:", tokenError);
        return res.status(500).json({ message: "Failed to save refresh token" });
      }
  
      res.status(201).json({
        message: "User registered successfully",
        accessToken,
        refreshToken,
      });
    } catch (err) {
      console.error("Error during registration:", err);
      throwError(err, res);
    }
  };
  

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
  
      await prisma.token.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt: expiresAt,
        },
      });
  
      // Update the user's refreshToken field
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: refreshToken },
      });
  
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
