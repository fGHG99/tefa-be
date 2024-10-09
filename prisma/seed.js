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

    // Fetch existing toko records to validate tokoName references
    const tokoRecords = await prisma.toko.findMany();
    const tokoMap = new Map(tokoRecords.map(t => [t.name, t.tokoId])); // Peta untuk menghubungkan nama toko dengan id

    // Validate produk data
    const invalidProduk = produk.filter(p => !tokoMap.has(p.tokoName));
    if (invalidProduk.length > 0) {
      console.error("Invalid produk data with non-existent tokoName:", invalidProduk);
      throw new Error("Some produk entries have invalid tokoName references.");
    }

    // Prepare produk data with tokoId
    const produkWithTokoId = produk.map(p => ({
      ...p,
      tokoId: tokoMap.get(p.tokoName), // Mengambil tokoId dari peta
      tokoName: undefined, // Opsional: Hapus tokoName jika tidak diperlukan
    }));

    // Insert produk data
    await prisma.produk.createMany({
      data: produkWithTokoId,
    });

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
