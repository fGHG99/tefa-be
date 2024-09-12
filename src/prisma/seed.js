const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const products = require('./products');

const seed = async () => {
  try {
    for (const product of products) {
      await prisma.produk.create({
        data: {
          title: product.title,
          price: product.price,
          imgUrl: product.imgUrl,
          type: product.type,
          toko: { connect: { id: product.tokoId } }, 
          inventory: {                              
            create: {
              quantity: product.inventoryQuantity,
            },
          },
        },
      });
    }
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
