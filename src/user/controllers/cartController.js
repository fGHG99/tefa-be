const { prisma } = require('../../utils/prisma');
const { createOrder } = require('./orderController');

const addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Fetch the product to get its tokoId and tokoName
    const product = await prisma.produk.findUnique({
      where: { id: productId },
      include: { toko: true } // Include toko to access tokoId and tokoName
    });

    console.log("Product fetched:", product); // Debugging log

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const tokoId = product.toko?.tokoId; // Access tokoId directly from the toko relation

    // Check if tokoId exists
    if (!tokoId) {
      return res.status(400).json({ error: 'Toko not found for the product' });
    }

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
              quantity,
              tokoId // Save the tokoId in CartItem
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
            cartId: cart.id, // Use cart.id here
            produkId: productId,
            quantity,
            tokoId // Save the tokoId in CartItem
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
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getCart = async (req, res) => {
  const { userId, cartId } = req.params;

  // Convert cartId to an integer
  const cartIdInt = parseInt(cartId);

  if (isNaN(cartIdInt)) {
    return res.status(400).json({ error: 'Invalid cart ID format' });
  }

  try {
    // Find the user's cart based on userId and cartId
    const cart = await prisma.cart.findFirst({
      where: {
        userId: userId,
        id: cartIdInt
      },
      include: {
        items: {
          include: {
            produk: {
              select: {
                id: true,
                title: true,
                price: true,
                tokoName: true // Fetching tokoName instead of tokoId
              }
            }
          }
        }
      }
    });

    // Check if the cart exists and has items
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: 'Cart is empty or not found' });
    }

    // Return the cart and items, now including tokoName instead of tokoId
    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const checkout = async (req, res) => {
  const { userId, deliveryMethod, address, recipientName, paymentMethod } = req.body || {};

  if (!req.body || !userId || !deliveryMethod || !recipientName || !paymentMethod) {
    return res.status(400).json({ error: 'Missing required fields: userId, deliveryMethod, recipientName, paymentMethod' });
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true }
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty or does not exist' });
    }

    if (deliveryMethod === 'delivery' && !address) {
      return res.status(400).json({ error: 'Address is required for delivery' });
    }

    const orders = await createOrder(userId, cart.items, deliveryMethod, address, recipientName, paymentMethod);
    return res.status(201).json(orders);
  } catch (error) {
    console.error('Error during checkout:', error);
    return res.status(500).json({ error: 'Something went wrong during checkout' });
  }
};


module.exports = {
  addItemToCart,
  checkout,
  getCart
};
