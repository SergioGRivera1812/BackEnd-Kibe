const pool = require('../config/db'); // Asegúrate de que el path sea correcto

// Obtener todos los usuarios
const getAllUsers = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users');  // Ajusta el nombre de la tabla si es necesario
    return rows; // Devuelve los usuarios
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};

// Obtener un usuario por ID
const getUserById = async (id) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0]; // Devuelve el primer usuario que coincide con el ID
  } catch (error) {
    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};

// Crear un nuevo usuario
const createUser = async (user) => {
  try {
    const { name, password,rol } = user; // Asegúrate de que los campos coincidan con los de tu base de datos
    const result = await pool.execute('INSERT INTO users (nombre, password,rol) VALUES (?, ?,?)', [name, password,rol]);
    return result; // Devuelve el resultado de la inserción
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};

// Actualizar un usuario
const updateUser = async (id, user) => {
  try {
    const { nombre, password, rol } = user; // Cambio 'name' por 'nombre'
    const result = await pool.execute(
      'UPDATE users SET nombre = ?, password = ?, rol = ? WHERE id = ?', 
      [nombre, password, rol, id]
    );
    return result; // Devuelve el resultado de la actualización
  } catch (error) {
    throw new Error('Error al actualizar el usuario: ' + error.message);
  }
};

// Eliminar un usuario
const deleteUser = async (id) => {
  try {
    const result = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return result; // Devuelve el resultado de la eliminación
  } catch (error) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
