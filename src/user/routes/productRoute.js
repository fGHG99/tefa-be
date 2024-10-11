const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct, getProductsByType, getProductById, } = require('../controllers/productController');
const { protect,isMerchant } = require('../middlewares/middleware');

const router = express.Router();

router.get('/',  getProducts);
router.post('/', protect, isMerchant, createProduct);
router.put('/:id', protect, isMerchant, updateProduct);
router.delete('/:id', protect, isMerchant,deleteProduct);
router.get('/type/:type',  getProductsByType);
router.get('/:id',  getProductById);


module.exports = router;
