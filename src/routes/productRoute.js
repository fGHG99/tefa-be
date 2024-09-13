const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct, getProductsByType } = require('./controllers/productController');

const router = express.Router();

router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/type/:type', getProductsByType);

module.exports = router;
