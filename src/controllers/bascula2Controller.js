const bascula2Model = require('../models/registroBascula2.model');

const bascula2Controller = {
    getAllRegistros: async (req, res) => {
        try {
            const registros = await bascula2Model.getAllRegistros();
            res.json(registros);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los registros de la bascula 2' , error: error.message});
        }
    },

    getRegistroById: async (req, res) => {
        try {
            const registro = await bascula2Model.getRegistroById(req.params.id);
            if (!registro) {
                return res.status(404).json({ error: 'Registro no encontrado' });
            }
            res.json(registro);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el registro de la bascula 2' });
        }
    },

    createRegistro: async (req, res) => {
        try {
            const registro = await bascula2Model.createRegistro(req.body);
            res.status(201).json({ message: 'Registro creado', id: registro.insertId });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el registro de la bascula 2', details: error.message });
        }
    },
     getRegistroByIdCamion: async (req, res) => {
            try {
                // Intentamos obtener el registro del camión
                const registro = await bascula2Model.getRegistroByIdCamion(req.params.idCamion);
                
                // Log para ver el registro que se trajo
                console.log('Registro obtenido:', registro);  // Esto te permitirá ver el registro en la consola
                
                // Si no se encuentra el registro, se devuelve un error 404
                if (!registro) {
                    return res.status(404).json({ error: 'Registro no encontrado' });
                }
                
                // Si el registro se encuentra, lo devolvemos como respuesta
                res.json(registro);
            } catch (error) {
                // En caso de error, se maneja con un error 500
                res.status(500).json({ error: 'Error al obtener el registro de la bascula 1' });
            }
        },
    updateRegistro: async (req, res) => {
        try {
            const { bruto, neto, fechaS, horaS, Entro, Salio, activo } = req.body;
            const idCamion = req.params.idCamion;
    
            console.log('🔍 ID Camión recibido:', idCamion);
            console.log('📦 Datos recibidos en el body:', req.body);
    
            if (!idCamion) {
                console.error('❌ Error: ID del camión no proporcionado');
                return res.status(400).json({ error: 'ID del camión no proporcionado' });
            }
    
            // Validamos si algún valor es undefined y lo convertimos a null
            const safeValues = {
                bruto: bruto !== undefined ? bruto : null,
                neto: neto !== undefined ? neto : null,
                fechaS: fechaS !== undefined ? fechaS : null,
                horaS: horaS !== undefined ? horaS : null,
                Salio: Salio !== undefined ? Salio : null,
                activo: activo !== undefined ? (activo === '0' || activo === '1' ? activo : '0') : '0',
            };
    
            console.log('🔄 Valores seguros para actualizar:', safeValues);
    
            const result = await bascula2Model.updateRegistro(
                idCamion,
                safeValues.bruto,
                safeValues.neto,
                safeValues.fechaS,
                safeValues.horaS,
                safeValues.Salio,
                safeValues.activo
            );
    
            console.log('📝 Resultado de la actualización:', result);
    
            if (result.affectedRows === 0) {
                console.warn('⚠️ No se encontró el camión para actualizar');
                return res.status(404).json({ error: 'No se encontró el camión para actualizar' });
            }
    
            console.log('✅ Registro actualizado correctamente');
            res.status(200).json({ message: 'Registro actualizado', result: result.affectedRows });
    
        } catch (error) {
            console.error('❌ Error en updateRegistro:', error.message);
            res.status(500).json({ error: 'Error al actualizar el registro de la báscula', details: error.message });
        }
    }
,    
    
    getTaraByIdCamion: async (req, res) => {
        try {
            const idCamion = req.params.idCamion;
            const tara = await bascula2Model.getTaraByIdCamion(idCamion);
            res.json({ tara });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el valor de tara', details: error.message });
        }
    },

    deleteRegistro: async (req, res) => {
        try {
            const registro = await bascula2Model.deleteRegistro(req.params.id);
            res.json({ message: 'Registro eliminado' });
        } catch (error) {        
            res.status(500).json({ error: 'Error al eliminar el registro de la bascula 2' });
        }
    },
     RegistrarAperturarB2: async (req, res) => {
            try {
                const registro = await bascula1Model.RegistrarAperturarB2(req.body);
                res.status(201).json({ message: 'Registro creado', id: registro.insertId });
            } catch (error) {
                res.status(500).json({ error: 'Error al crear el registro de apertura de la bascula 2', details: error.message });
            }
        }
};

module.exports = bascula2Controller;