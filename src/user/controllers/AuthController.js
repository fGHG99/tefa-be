const { prisma } = require("../../utils/Prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const accessTokenExpireIn = 60 * 60 * 1; // 1 hour
const refreshTokenExpireIn = 60 * 60 * 24; // 24 hours

// Generate Access Token
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: accessTokenExpireIn });
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: refreshTokenExpireIn });
  return refreshToken;
};

// Register New User
const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const emailAlreadyExist = await prisma.user.findFirst({ where: { email } });
    if (emailAlreadyExist) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: "USER" }
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email not found!" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.$transaction([
      prisma.token.create({
        data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now() + refreshTokenExpireIn * 1000) }
      }),
      prisma.user.update({ where: { id: user.id }, data: { refreshToken } })
    ]);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: accessTokenExpireIn * 1000,
    });

    return res.status(200).json({
      data: {
        userId: user.id,
        name: user.name,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Refresh Access Token
const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  
  if (!requestToken) return res.status(403).json({ message: "Refresh Token is required!" });

  try {
    const storedToken = await prisma.token.findUnique({ where: { token: requestToken } });
    if (!storedToken) return res.status(403).json({ message: "Invalid Refresh Token!" });

    if (new Date(storedToken.expiresAt) < new Date()) {
      await prisma.token.delete({ where: { token: requestToken } });
      return res.status(403).json({ message: "Refresh token expired. Please log in again." });
    }

    const user = await storedToken.user;
    const newAccessToken = generateAccessToken(user);

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: storedToken.token,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to refresh token", error: err.message });
  }
};

// Logout User
const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { register, login, refreshToken, logout };
