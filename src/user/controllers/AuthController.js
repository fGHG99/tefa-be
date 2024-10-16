const { prisma } = require("../../utils/Prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const accessTokenExpireIn = 60 * 60 * 24; 

// Generate Access Token
const AccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: accessTokenExpireIn });
};

// Register New User
const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const emailAlreadyExist = await prisma.user.findFirst({ where: { email } });
    if (emailAlreadyExist) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email,name ,password: hashedPassword, role: "USER" }
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

    const token = AccessToken(user);

    await prisma.$transaction([
      prisma.token.create({
        data: { token: token, userId: user.id, expiresAt: new Date(Date.now() + accessTokenExpireIn * 1000) }
      }),
      prisma.user.update({ where: { id: user.id }, data: { token } })
    ]);

    // Send the user's role and token back in the response
    return res.status(200).json({
      data: {
        userId: user.id,
        name: user.name,
        role: user.role, 
      },
      accessToken: token, 
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
};


// Logout User
// const logout = (req, res) => {
//   res.clearCookie('token', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//   });
//   res.status(200).json({ message: "Logged out successfully" });
// };

module.exports = { register, login };
