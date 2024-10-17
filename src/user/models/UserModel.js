const { throwError } = require("../../utils/Helper");
const { prisma } = require("../../utils/Prisma");

const isExist = async (id) => {
  try {
    return await prisma.user.findFirst({
      where: { id: id },
    });
  } catch (err) {
    throwError(err);
  }
};

const updateUser = async (id, data) => {
  try {
    return await prisma.user.update({
      where: { id: id },
      data: {
        name: data.name,   // Update the name if provided
        class: data.class, // Update the class if provided
      },
    });
  } catch (err) {
    throwError(err);
  }
};

module.exports = { isExist, updateUser };
