const { prisma } = require('../utils/prisma');

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

      // Update the user to set the cartId
      await prisma.user.update({
        where: { id: userId },
        data: { cartId: cart.id }
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

    try { 
      await prisma.user.update({
        where: { id: userId },
        data: { cartId: cart.id }
      });
      console.log(`User ${userId} updated with cartId ${cart.id}`);
    } catch (error) {
      console.error('Error updating user cartId:', error); // Log error if update fails
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  addItemToCart
};
