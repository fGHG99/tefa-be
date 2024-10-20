const { PrismaClient } = require("@prisma/client");
const toko = require("../src/user/data/Toko");

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Clearing existing data...");
    await prisma.orderItem.deleteMany({});
    await prisma.cartItem.deleteMany({});
    await prisma.inventory.deleteMany({});
    await prisma.produk.deleteMany({});
    await prisma.toko.deleteMany({});

    console.log("Inserting data from toko.js...");
    await prisma.toko.createMany({
      data: toko,
    });

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
