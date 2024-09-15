const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Check if the user already has a cart
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true }
    });

    if (!cart) {
      // If no cart exists, create a new one with the item
      cart = await prisma.cart.create({
        data: {
          userId,
          items: {
            create: {
              produkId: productId,
              quantity
            }
          }
        },
        include: { items: true }
      });
    } else {
      // Check if the item already exists in the cart
      const existingItem = cart.items.find(item => item.produkId === productId);

      if (existingItem) {
        // If item exists, update the quantity
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity }
        });
      } else {
        // If item does not exist, create a new cart item
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            produkId: productId,
            quantity
          }
        });
      }
    }

    // Retrieve updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true }
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  addItemToCart
};
