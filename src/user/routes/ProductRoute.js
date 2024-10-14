const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct, getProductsByType, getProductById } = require('../controllers/ProductContoller');

const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/type/:type', getProductsByType);
router.get('/:id', getProductById);

module.exports = router;
