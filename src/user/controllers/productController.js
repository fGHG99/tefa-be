const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const logErrorToFile = require('./logger');

  const getProducts = async (req, res) => {
  try {
    const products = await prisma.produk.findMany({
      include: {
        toko: true,
        inventory: true,
        cartItems: true,
      },
    });

    const productsWithQuantity = products.map(product => ({
      ...product,
      inventoryQuantity: product.inventory ? product.inventory.quantity : null,
      productQuantity: product.quantity,
    }));

    res.status(200).json(productsWithQuantity);
  } catch (error) {
    logErrorToFile(error); // Log the error
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
};

// Get a product by ID with related toko and inventory
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.produk.findUnique({
      where: { id: Number(id) },
      include: {
        toko: true,
        inventory: true,
        cartItems: true,
      },
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    logErrorToFile(error); // Log the error
    res.status(500).json({ error: 'Failed to fetch product', details: error.message });
  }
};

// Create a new product with associated toko and inventory
const createProduct = async (req, res) => {
  try {
    const { title, price, imgUrl, type, tokoId, inventoryQuantity } = req.body;

    const newProduct = await prisma.produk.create({
      data: {
        title,
        price,
        imgUrl,
        type,
        toko: { connect: { tokoId } }, // Use the correct field
        inventory: {
          create: {
            quantity: inventoryQuantity,
          },
        },
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    logErrorToFile(error); // Log the error
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
};

// Update a product with possible modifications to toko and inventory
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, imgUrl, type, tokoId, inventoryQuantity } = req.body;

    const updatedProduct = await prisma.produk.update({
      where: { id: Number(id) },
      data: {
        title,
        price,
        imgUrl,
        type,
        toko: { connect: { tokoId } },
        inventory: {
          update: {
            quantity: inventoryQuantity,
          },
        },
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    logErrorToFile(error); // Log the error
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.produk.delete({
      where: { id: Number(id) },
    });

    res.status(204).json({ message: 'Product deleted successfully' });
  } catch (error) {
    logErrorToFile(error); // Log the error
    res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
};

// Get products filtered by ProdukType
const getProductsByType = async (req, res) => {
  try {
    const { type } = req.params;

    const products = await prisma.produk.findMany({
      where: {
        type: type,
      },
    });

    res.status(200).json(products);
  } catch (error) {
    logErrorToFile(error); // Log the error
    res.status(500).json({ error: 'Failed to fetch products by type', details: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByType,
};
