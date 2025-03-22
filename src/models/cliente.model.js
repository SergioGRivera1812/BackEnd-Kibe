const pool = require('../config/db'); 

const getAllClientes = async () => {
    try {
      const [rows] = await pool.execute('SELECT cliente FROM clientes');
      return rows;
    } catch (error) {
      throw new Error('Error al obtener los clientes: ' + error.message);
    }
  };
  module.exports = {
    getAllClientes
  };