const express = require('express');
const ProductController = require('../controllers/productoController');

const router = express.Router();
router.get('/', ProductController.getAllProductos);
router.get('/:id', ProductController.getProductoById);
router.post('/', ProductController.createProducto);
router.put('/:id', ProductController.updateProducto);
router.delete('/:id', ProductController.deleteProducto);

module.exports = router;