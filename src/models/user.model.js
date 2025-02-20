const pool = require('../config/db'); 
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
  try {
    const [rows] = await pool.execute('SELECT id, nombre, rol, bascula FROM users');
    return rows;
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};

const getUserById = async (id) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};

const createUser = async (user) => {
  try {
    const { name, password,rol } = user; 
    const result = await pool.execute('INSERT INTO users (nombre, password,rol) VALUES (?, ?,?)', [name, password,rol]);
    return result; 
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};

const updateUser = async (id, user) => {
  try {
    const { nombre, password, rol,bascula } = user;

    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    } else {
      hashedPassword = null; 
    }

    const result = await pool.execute(
      'UPDATE users SET nombre = ?, password = COALESCE(?, password), rol = ?, bascula = ? WHERE id = ?', 
      [nombre, hashedPassword, rol, bascula,id]
    );
    
    return result;
  } catch (error) {
    throw new Error('Error al actualizar el usuario: ' + error.message);
  }
};



// Eliminar un usuario
const deleteUser = async (id) => {
  try {
    const result = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return result;
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
