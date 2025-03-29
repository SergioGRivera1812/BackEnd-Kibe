const bascula1Model = require('../models/registroBascula1.model');

const bascula1Controller = {
    getAllRegistros: async (req, res) => {
        try {
            const registros = await bascula1Model.getAllRegistros();
            res.json(registros);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los registros de la bascula 1' , error: error.message});
        }
    },

    getRegistroById: async (req, res) => {
        try {
            const registro = await bascula1Model.getRegistroById(req.params.id);
            if (!registro) {
                return res.status(404).json({ error: 'Registro no encontrado' });
            }
            res.json(registro);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el registro de la bascula 1' });
        }
    },

    //agrega a b2
    getRegistroByIdCamion: async (req, res) => {
        try {
            // Intentamos obtener el registro del camión
            const registro = await bascula1Model.getRegistroByIdCamion(req.params.idCamion);
            
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


    createRegistro: async (req, res) => {
        try {
            const registro = await bascula1Model.createRegistro(req.body);
            res.status(201).json({ message: 'Registro creado', id: registro.insertId });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el registro de la bascula 1', details: error.message });
        }
    },

    updateRegistro: async (req, res) => {
        try {
            const { bruto, neto, fechaS, horaS, Entro, Salio, activo } = req.body;
            const idCamion = req.params.idCamion;
    
            if (!idCamion) {
                return res.status(400).json({ error: 'ID del camión no proporcionado' });
            }
    
            // Validamos si algún valor es undefined y lo convertimos a null
            const safeValues = {
                bruto: bruto !== undefined ? bruto : null,
                neto: neto !== undefined ? neto : null,
                fechaS: fechaS !== undefined ? fechaS : null,
                horaS: horaS !== undefined ? horaS : null,
                Salio: Salio !== undefined ? Salio : null,
                activo: activo !== undefined ? activo : null,
            };
    
           
    
            const result = await bascula1Model.updateRegistro(
                idCamion,
                safeValues.bruto,
                safeValues.neto,
                safeValues.fechaS,
                safeValues.horaS,
                safeValues.Salio,
                safeValues.activo
            );
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'No se encontró el camión para actualizar' });
            }
    
            res.status(200).json({ message: 'Registro actualizado', result: result.affectedRows });
        } catch (error) {
            console.error('Error en updateRegistro:', error.message);
            res.status(500).json({ error: 'Error al actualizar el registro de la bascula 1', details: error.message });
        }
    },
    
    
    getTaraByIdCamion: async (req, res) => {
        try {
            const idCamion = req.params.idCamion;
            const tara = await bascula1Model.getTaraByIdCamion(idCamion);
            res.json({ tara });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el valor de tara', details: error.message });
        }
    },

    deleteRegistro: async (req, res) => {
        try {
            const registro = await bascula1Model.deleteRegistro(req.params.id);
            res.json({ message: 'Registro eliminado' });
        } catch (error) {        
            res.status(500).json({ error: 'Error al eliminar el registro de la bascula 1' });
        }
    },
    getRegistroByIdOrUsername: async (req, res) => {
        try {
            const { id, usuario } = req.query; // Usamos query para id o nombre de usuario

            if (id) {
                // Si se proporciona el id, buscamos por id
                const registro = await bascula1Model.getRegistroById(id);
                if (!registro) {
                    return res.status(404).json({ error: 'Registro no encontrado' });
                }
                return res.json(registro);
            } else if (usuario) {
                // Si se proporciona el usuario, buscamos por nombre de usuario
                const registro = await bascula1Model.getRegistroByUsuario(usuario);
                if (!registro) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                return res.json(registro);
            } else {
                return res.status(400).json({ error: 'Debe proporcionar un id o nombre de usuario' });
            }

        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el registro', details: error.message });
        }
    },

    RegistrarAperturarB1: async (req, res) => {
        try {
            const registro = await bascula1Model.RegistrarAperturarB1(req.body);
            res.status(201).json({ message: 'Registro creado', id: registro.insertId });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el registro de apertura de la bascula 1', details: error.message });
        }
    }
};

module.exports = bascula1Controller;