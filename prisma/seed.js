const { PrismaClient } = require("@prisma/client");
const toko = require("../src/user/data/toko.js");
const produk = require("../src/user/data/products.js");

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

    console.log("Inserting data from products.js...");

    // Fetch existing toko records to validate tokoId references
    const tokoRecords = await prisma.toko.findMany();
    const tokoIds = new Set(tokoRecords.map((t) => t.tokoId));

    // Validate produk data
    const invalidProduk = produk.filter((p) => !tokoIds.has(p.tokoId));
    if (invalidProduk.length > 0) {
      console.error(
        "Invalid produk data with non-existent tokoId:",
        invalidProduk
      );
      throw new Error("Some produk entries have invalid tokoId references.");
    }

    // Insert produk data
    await prisma.produk.createMany({
      data: produk,
    });

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
