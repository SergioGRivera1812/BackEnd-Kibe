const pool = require('../config/db'); 


const getAllBus = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM camiones');  
    return rows; 
  } catch (error) {
    throw new Error('Error al obtener los unidades: ' + error.message);
  }
};

const getBusById = async (id) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM camiones WHERE id = ?', [id]);
    return rows[0]; 
  } catch (error) {
    throw new Error('Error al obtener la unidad: ' + error.message);
  }
};

const createBus = async (bus) => {
  try {
    const { nombreChofer,apellidoChofer,unidad,tara,placas,origen,tag } = bus; 
    const result = await pool.execute('INSERT INTO camiones (nombreChofer,apellidoChofer,unidad,tara,placas,origen,tag) VALUES (?, ?, ?,? ,?, ?, ?)', [nombreChofer,apellidoChofer,unidad,tara,placas,origen,tag]);
    return result; 
  } catch (error) {
    throw new Error('Error al crear la unidad: ' + error.message);
  }
};

const updateBus = async (id, bus) => {
  try {
    const { nombreChofer,apellidoChofer,unidad,tara,placas,origen,tag } = bus; 
    const result = await pool.execute('UPDATE camiones SET nombreChofer = ?, apellidoChofer = ?,unidad = ?,tara = ?, placas = ?, origen = ?, tag = ? WHERE id = ?',[nombreChofer, apellidoChofer, unidad, tara, placas, origen, tag, id]
    );
    return result;
  } catch (error) {
    throw new Error('Error al actualizar el unidad: ' + error.message);
  }
};


const deleteBus = async (id) => {
  try {
    const result = await pool.execute('DELETE FROM camiones WHERE id = ?', [id]);
    return result; 
  } catch (error) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};
const getBusByTag = async (tag) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM camiones WHERE tag = ?', [tag]);
    return rows[0]; 
  } catch (error) {
    throw new Error('Error al obtener la unidad por tag: ' + error.message);
  }
};

module.exports = {
  getAllBus,
  getBusById,
  createBus,
  updateBus,
  deleteBus,
  getBusByTag
};
