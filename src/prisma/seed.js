import { PrismaClient } from "@prisma/client";
import { toko } from "../data/toko.js";
import { produk } from "../data/products.js";

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data
    await prisma.toko.deleteMany({});
    await prisma.produk.deleteMany({});

    // Insert data from imported files
    await prisma.toko.createMany({
      data: toko,
    });

    await prisma.produk.createMany({
      data: produk,
    });

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    // Close the Prisma client connection
    await prisma.$disconnect();
  }
}

main();
