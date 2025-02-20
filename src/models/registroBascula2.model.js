const pool = require('../config/db');

const getAllRegistros = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM bascula2');
        return rows;
    } catch (error) {
        throw new Error('Error al obtener los registros: ' + error.message);
    }
};

const getRegistroById = async (id) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM bascula2 WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        throw new Error('Error al obtener el registro: ' + error.message);
    }
};

const createRegistro = async (registro) => {
    try {
        const { idCamion, placas, conductor, producto, cliente, origen, destino, tara, bruto, neto, fechaE, horaE, fechaS, horaS, operador, activo } = registro;

        const [result] = await pool.execute(
            `INSERT INTO bascula2 (idCamion,placas, conductor, producto, cliente, origen, destino, tara, bruto, neto, fechaE, horaE, fechaS, horaS, operador,activo) 
             VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [idCamion, placas, conductor, producto, cliente, origen, destino, tara, bruto, neto, fechaE, horaE, fechaS, horaS, operador, activo]
        );

        return result;
    } catch (error) {
        throw new Error('Error al crear el registro: ' + error.message);
    }
};

const updateRegistro = async (idCamion, bruto, neto, fechaS, horaS, activo) => {
    try {
        const [result] = await pool.execute(
            `UPDATE bascula2 
            SET bruto = ?, neto = ?, fechaS = ?, horaS = ?, activo = ?
            WHERE idCamion = ?`, 
            [bruto, neto, fechaS, horaS, activo, idCamion]
        );
        return result;
    } catch (error) {
        throw new Error('Error al actualizar el registro: ' + error.message);
    }
};

const deleteRegistro = async (id) => {
    try {
        const result = await pool.execute('DELETE FROM bascula2 WHERE id = ?', [id]);
        return result;
    } catch (error) {
        throw new Error('Error al eliminar el usuario: ' + error.message);
    }
};

const getTaraByIdCamion = async (idCamion) => {
    try {
        const [rows] = await pool.execute('SELECT tara FROM bascula2 WHERE idCamion = ?', [idCamion]);
        if (rows.length > 0) {
            return rows[0].tara;
        } else {
            throw new Error('Camión no encontrado');
        }
    } catch (error) {
        throw new Error('Error al obtener el valor de tara: ' + error.message);
    }
};
module.exports = { getAllRegistros, getRegistroById, createRegistro, updateRegistro, deleteRegistro,getTaraByIdCamion };