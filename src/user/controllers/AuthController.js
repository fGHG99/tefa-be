const { throwError } = require("../../utils/Helper");
const { prisma } = require("../../utils/Prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET; 

const expireIn = 60 * 60 * 1
const expireAt = new Date(Date.now() + expireIn * 1000)

const accessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    secret,
    { expiresIn: expireIn }
  );
};

const register = async (req, res) => {
    try {
      const { email, name, password } = req.body;
      const emailAlreadyExist = await prisma.user.findFirst({ where: { email } });
      if (emailAlreadyExist) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const newUser = await prisma.user.create({
          data: { email, password: hashedPassword, name, role: "USER" },
        });
  
        return res.status(201).json({
          message: "User registered successfully",
        });
      } catch (createError) {
        console.error("Error during user creation:", createError);
        return res.status(500).json({ message: "Failed to create user" });
      }
    } catch (err) {
      console.error("Error during registration:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email not found!" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    const Token = accessToken(user);

    await prisma.$transaction([
      prisma.token.create({ data: { token: Token, userId: user.id, expiresAt: expireAt } }),
      prisma.user.update({ where: { id: user.id }, data: { refreshToken: Token } })
    ]);

    res.status(200).json({
      data: {
        UserId: user.id,
        name: user.name,
      },
      token: Token,
    });
  } catch (err) {
    throwError(err, res);
  }
};


// Logout (Protected)
const logout = async (req, res) => {
  const { token } = req.body;
  try {
    // Check if refresh token exists in the database
    const tokenRecord = await prisma.token.findFirst({ where: { token: token } });
    if (!tokenRecord) return res.status(404).json({ message: " token not found in the database" });

    await prisma.token.delete({ where: { id: tokenRecord.id } });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    throwError(err, res);
  }
};

module.exports = { register, login, logout };
