const pool = require('../config/db');

const getAllRegistros = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM bascula1');
        return rows;
    } catch (error) {
        throw new Error('Error al obtener los registros: ' + error.message);
    }
};

const getRegistroById = async (id) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM bascula1 WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        throw new Error('Error al obtener el registro: ' + error.message);
    }
};
const getRegistroByUsuario = async (usuario) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM bascula1 WHERE conductor = ?', [usuario]);
        return rows[0];
    } catch (error) {
        throw new Error('Error al obtener el registro por usuario: ' + error.message);
    }
};

const createRegistro = async (registro) => {
    try {
        const { idCamion, placas, conductor, producto, cliente, origen, destino, tara, bruto, neto, fechaE, horaE, fechaS, horaS, operador, Entro, Salio, activo } = registro;

        const [result] = await pool.execute(
            `INSERT INTO bascula1 (idCamion,placas, conductor, producto, cliente, origen, destino, tara, bruto, neto, fechaE, horaE, fechaS, horaS, operador,Entro,Salio,activo) 
             VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
            [idCamion, placas, conductor, producto, cliente, origen, destino, tara, bruto, neto, fechaE, horaE, fechaS, horaS, operador, Entro, Salio, activo]
        );

        return result;
    } catch (error) {
        throw new Error('Error al crear el registro: ' + error.message);
    }
};

const updateRegistro = async (idCamion, bruto, neto, fechaS, horaS, salio, activo) => {
    try {
        // Determinar en qué tabla está registrado el camión
        const [rows] = await pool.execute(
            `SELECT 'bascula1' AS tabla FROM bascula1 WHERE idCamion = ?
             UNION ALL
             SELECT 'bascula2' AS tabla FROM bascula2 WHERE idCamion = ?
             LIMIT 1`,
            [idCamion, idCamion]
        );

        if (rows.length === 0) {
            throw new Error('Camión no encontrado en ninguna báscula');
        }

        const tabla = rows[0].tabla; // Obtener la tabla correspondiente

        // Ejecutar el UPDATE en la tabla correcta
        const [result] = await pool.execute(
            `UPDATE ${tabla} 
            SET bruto = ?, neto = ?, fechaS = ?, horaS = ?, salio = ?, activo = ?
            WHERE idCamion = ?`,
            [bruto, neto, fechaS, horaS, salio, activo, idCamion]
        );

        if (result.affectedRows === 0) {
            throw new Error(`No se pudo actualizar el registro en ${tabla}`);
        }

        return `Registro actualizado correctamente en ${tabla}`;
    } catch (error) {
        throw new Error('Error al actualizar el registro: ' + error.message);
    }
};


const deleteRegistro = async (id) => {
    try {
        const result = await pool.execute('DELETE FROM bascula1 WHERE id = ?', [id]);
        return result;
    } catch (error) {
        throw new Error('Error al eliminar el usuario: ' + error.message);
    }
};

const getTaraByIdCamion = async (idCamion) => {
    try {
        const [rows] = await pool.execute(
            `SELECT tara
            FROM (
                SELECT tara, id FROM bascula1 WHERE idCamion = ? AND tara IS NOT NULL AND tara != ''
                UNION ALL
                SELECT tara, id FROM bascula2 WHERE idCamion = ? AND tara IS NOT NULL AND tara != ''
            ) AS combined
            ORDER BY id DESC
            LIMIT 1;
                `,
            [idCamion, idCamion]
        );
        console.log(rows); // Añadir para verificar los resultados


        if (rows.length > 0) {
            return rows[0].tara;
        } else {
            throw new Error('Camión no encontrado en ninguna báscula');
        }
    } catch (error) {
        throw new Error('Error al obtener el valor de tara: ' + error.message);
    }
};

const RegistrarAperturarB1 = async () => {
    try {
        const { apertura,Peso,modoAp,nombre } = registro;

        const [result] = await pool.execute(
            `INSERT INTO aperturabascula1 (apertura,Peso,modoAp,nombre) 
             VALUES (?, ?,?, ?)`,
            [apertura,Peso,modoAp,nombre]
        );

        return result;
    } catch (error) {
        throw new Error('Error al crear el registro: ' + error.message);
    }
}
module.exports = { getAllRegistros, getRegistroById, createRegistro, updateRegistro, deleteRegistro, getTaraByIdCamion, getRegistroByUsuario, RegistrarAperturarB1 };