const pool = require('../config/db'); 
const bcrypt = require("bcryptjs");

const getAllProductos = async () => {
  try {
    const [rows] = await pool.execute('SELECT id, producto FROM productos');
    return rows;
  } catch (error) {
    throw new Error('Error al obtener los productos: ' + error.message);
  }
};

const getProductoById = async (id) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error al obtener el producto: ' + error.message);
  }
};

const createProducto = async (productos) => {
  try {
    const { producto } = productos; 
    const result = await pool.execute('INSERT INTO productos (producto) VALUES (?)', [producto]);
    return result; 
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};

const updateProducto = async (id, productos) => {
  try {
    const { producto } = productos; 

    const result = await pool.execute(
      'UPDATE productos SET producto = ? WHERE id = ?', [producto,id]
    );
    
    return result;
  } catch (error) {
    throw new Error('Error al actualizar el producto: ' + error.message);
  }
};



// Eliminar un usuario
const deleteProducto = async (id) => {
  try {
    const result = await pool.execute('DELETE FROM productos WHERE id = ?', [id]);
    return result;
  } catch (error) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
