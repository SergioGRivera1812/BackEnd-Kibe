const ProductModel = require('../models/producto.model');

const ProductController = {
    getAllProductos: async (req, res) => {
        try {
            const product = await ProductModel.getAllProductos();
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener la lista de productos' });
        }
    },

    getProductoById: async (req, res) => {
        try {
            const product = await ProductModel.getProductoById(req.params.id);
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener el producto' });
        }
    },

    createProducto: async (req, res) => {
        try {
            const result = await ProductModel.createProducto(req.body);
            res.status(201).json({ message: 'Producto crerada', busId: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Error al crear el producto' });
        }
    },

    updateProducto: async (req, res) => {
        try {
            const result = await ProductModel.updateProducto(req.params.id, req.body);
            res.json({ message: 'Producto actualizado' });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    },

    deleteProducto: async (req, res) => {
        try {
            const result = await ProductModel.deleteProducto(req.params.id);
            res.json({ message: 'Producto eliminado' });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    },
};

module.exports = ProductController;
