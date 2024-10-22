const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all products with related toko and inventory
const getProducts = async (req, res) => {
  try {
    const products = await prisma.produk.findMany({
      include: {
        toko: true,        // Include related store (Toko)
        inventory: true,   // Include related inventory
        cartItems: true,   // Include related cart items if needed
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
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
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Create a new product with associated toko and inventory
const createProduct = async (req, res) => {
  try {
    const { title, price, imgUrl, type, tokoId, tokoName, inventoryQuantity } = req.body;

    // Create the product in the database
    const newProduct = await prisma.produk.create({
      data: {
        title,
        price,
        imgUrl,
        type,
        toko: {
          connect: {
            tokoId: tokoId, // Use tokoId from the Toko model (UUID)
          },
        },
        tokoName, // This is an optional field if you want to store it
        inventory: {
          create: {
            quantity: inventoryQuantity || 0, // Set default quantity to 0 if not provided
          },
        },
        quantity: inventoryQuantity || 0,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
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
        toko: { connect: { id: tokoId } },
        inventory: {
          update: {
            quantity: inventoryQuantity,
          },
        },
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
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
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// Get products filtered by ProdukType
const getProductsByType = async (req, res) => {
  try {
    const { type } = req.params;

    const products = await prisma.produk.findMany({
      where: {
        type: type,  // No need to cast in JS
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products by type' });
  }
};

const getProductByTokoId = async (req, res) => {
  try {
    const { tokoId } = req.params;

    // Fetch products where tokoId matches
    const products = await prisma.produk.findMany({
      where: {
        tokoId: tokoId, // Use tokoId from the request parameters
      },
      include: {
        toko: true,      // Optionally include toko details
        inventory: true, // Optionally include inventory details
      },
    });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this store' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByType,
  getProductByTokoId,
};