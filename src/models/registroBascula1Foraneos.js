const pool = require('../config/db');

const getAllRegistrosForaneos = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM bascula1Foraneos');
        return rows;
    } catch (error) {
        throw new Error('Error al obtener los registros: ' + error.message);
    }
};

const getRegistroByIdForaneos = async (id) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM bascula1Foraneos WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        throw new Error('Error al obtener el registro: ' + error.message);
    }
};
const getRegistroByIdCamionForaneos = async (idCamion) => {
    try {
        // Suponiendo que 'id' es un campo autoincremental que indica el orden de registro
        const [rows] = await pool.execute(
            'SELECT * FROM bascula1Foraneos WHERE idCamion = ? ORDER BY id DESC LIMIT 1',
            [idCamion]
        );
        if (rows.length === 0) {
            return null; // Si no hay registros, retornamos null
        }
        return rows[0]; // Retornamos solo el primer registro (el más reciente)
    } catch (error) {
        throw new Error('Error al ejecutar la consulta SQL: ' + error.message);
    }
};
const getRegistroByUsuarioForaneos = async (usuario) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM bascula1Foraneos WHERE conductor = ?', [usuario]);
        return rows[0];
    } catch (error) {
        throw new Error('Error al obtener el registro por usuario: ' + error.message);
    }
};

const createRegistroForaneos = async (registro) => {
    try {
        const { idCamion, placas, conductor, producto, cliente, origen, destino, tara, bruto, neto, fechaE, horaE, fechaS, horaS, operador, Entro, Salio, activo } = registro;

        const [result] = await pool.execute(
            `INSERT INTO bascula1Foraneos (idCamion,placas, conductor, producto, cliente, origen, destino, tara, bruto, neto, fechaE, horaE, fechaS, horaS, operador,Entro,Salio,activo) 
             VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
            [idCamion, placas, conductor, producto, cliente, origen, destino, tara, bruto, neto, fechaE, horaE, fechaS, horaS, operador, Entro, Salio, activo]
        );

        return result;
    } catch (error) {
        throw new Error('Error al crear el registro: ' + error.message);
    }
};

const updateRegistroForaneos = async (idCamion, bruto, neto, fechaS, horaS, salio, activo) => {
    try {
        // Determinar la tabla y el registro más reciente
        const [rows] = await pool.execute(
            `SELECT 'bascula1Foraneos' AS tabla, fechaE 
             FROM bascula1Foraneos WHERE idCamion = ? 
             UNION ALL
             SELECT 'bascula2Foraneos' AS tabla, fechaE 
             FROM bascula2Foraneos WHERE idCamion = ?
             ORDER BY fechaE DESC
             LIMIT 1`, 
            [idCamion, idCamion]
        );

        if (rows.length === 0) {
            throw new Error('Camión no encontrado en ninguna báscula');
        }

        const tabla = rows[0].tabla;  // Obtener la tabla con el registro más reciente

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

        console.log(`Registro actualizado correctamente en ${tabla}`);
        return `Registro actualizado correctamente en ${tabla}`;
    } catch (error) {
        throw new Error('Error al actualizar el registro: ' + error.message);
    }
};



const deleteRegistroForaneos = async (id) => {
    try {
        const result = await pool.execute('DELETE FROM bascula1Foraneos WHERE id = ?', [id]);
        return result;
    } catch (error) {
        throw new Error('Error al eliminar el usuario: ' + error.message);
    }
};

const getTaraByIdCamionForaneos = async (idCamion) => {
    try {
        const [rows] = await pool.execute(
            `SELECT tara
            FROM (
                SELECT tara, id FROM bascula1Foraneos WHERE idCamion = ? AND tara IS NOT NULL AND tara != ''
                UNION ALL
                SELECT tara, id FROM bascula2Foraneos WHERE idCamion = ? AND tara IS NOT NULL AND tara != ''
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
module.exports = { 
    getAllRegistrosForaneos, 
    getRegistroByIdForaneos, 
    createRegistroForaneos, 
    updateRegistroForaneos, 
    deleteRegistroForaneos, 
    getTaraByIdCamionForaneos, 
    getRegistroByUsuarioForaneos, 
    RegistrarAperturarB1,
    getRegistroByIdCamionForaneos };