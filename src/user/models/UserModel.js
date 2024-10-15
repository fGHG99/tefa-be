const { throwError } = require("../../utils/Helper");
const { prisma } = require("../../utils/Prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = async (email) => {
  try {
    return await prisma.user.findFirst({ where: { email: email } });
  } catch (err) {
    throwError(err);
  }
};

const isExist = async (id) => {
  try {
    return await prisma.user.findFirst({
      where: { id: id },
    });
  } catch (err) {
    throwError(err);
  }
};
const logIn = async (body) => {
  const { email, password } = body;
  try {
    const user = await getUser(email);
    if (!user) throw new Error("Email tidak ditemukan!");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Password tidak sesuai");

    const token = jwt.sign(user, process.env.JWT_SECRET);
    await prisma.token.create({ data: { token, userId: user.id } })
    delete user.password
    delete user.id
    return { token, user };
  } catch (err) {
    throwError(err);
  }
};
const emailExist = async (email) => {
  try{
    return await prisma.user.findFirst({ where: { email } })
  }catch(err){
    throwError(err)
  }
}
const signUp = async (data) => {
  try {
    const { email, name, password } = data;
    const emailAlreadyExist = await emailExist(email)
    if(emailAlreadyExist) throw Error('Email Already exist')
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "USER",
      },
    });
  } catch (err) {
    throwError(err);
  }
};
const update = async (id, data) => {
  try {
    const user = await isExist({ id })
    if (!user) throw Error('User didnt exist')
    return await prisma.user.update({ where: { id }, data })
  } catch (err) {
    throwError(err)
  }
}

const logOUt = async (token) => {
  try {
    const isExist = await prisma.token.findFirst({ where: { token } })
    if (!isExist) throw Error('Token didnt exist in db')
    return await prisma.token.delete({ where: { id: isExist.id } })
  } catch (err) {
    throwError(err)
  }
}

module.exports = { getUser, isExist, logIn, signUp, update, logOUt };