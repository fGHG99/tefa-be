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

    console.log("Inserting toko data...");

    // Fetch seller records from User table
    const sellerRecords = await prisma.user.findMany({
      where: {
        role: 'SELLER', // Ensure we're fetching only sellers
      },
    });

    // Create a map of sellerUsername (or sellerEmail) to userId (sellerId)
    const sellerMap = new Map(sellerRecords.map(s => [s.username, s.id])); // Assuming 'username' is used

    // Validate toko data for missing sellerUsername
    const invalidToko = toko.filter(t => !sellerMap.has(t.sellerUsername));
    if (invalidToko.length > 0) {
      console.error("Invalid toko data with non-existent sellerUsername:", invalidToko);
      throw new Error("Some toko entries have invalid sellerUsername references.");
    }

    // Prepare toko data with sellerId (userId)
    const tokoWithSellerId = toko.map(t => ({
      ...t,
      sellerId: sellerMap.get(t.sellerUsername), // Assign sellerId based on sellerUsername
      sellerUsername: undefined, // Optionally remove sellerUsername if not needed
    }));

    // Insert toko data with sellerId
    await prisma.toko.createMany({
      data: tokoWithSellerId,
    });

    console.log("Inserting produk data...");

    // Fetch toko records to validate tokoName references
    const tokoRecords = await prisma.toko.findMany();
    const tokoMap = new Map(tokoRecords.map(t => [t.name, t.tokoId])); // Map tokoName to tokoId

    // Validate produk data for missing tokoName
    const invalidProduk = produk.filter(p => !tokoMap.has(p.tokoName));
    if (invalidProduk.length > 0) {
      console.error("Invalid produk data with non-existent tokoName:", invalidProduk);
      throw new Error("Some produk entries have invalid tokoName references.");
    }

    // Prepare produk data with tokoId
    const produkWithTokoId = produk.map(p => ({
      ...p,
      tokoId: tokoMap.get(p.tokoName), // Assign tokoId based on tokoName
      tokoName: undefined, // Optionally remove tokoName if not needed
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
