const bascula2ForaneosModel = require('../models/registroBascula2Foraneos');

const bascula2ForaneosController = {
    getAllRegistrosForaneos: async (req, res) => {
        try {
            const registros = await bascula2ForaneosModel.getAllRegistrosForaneos();
            res.json(registros);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los registros de la bascula 1' , error: error.message});
        }
    },

    getRegistroByIdForaneos: async (req, res) => {
        try {
            const registro = await bascula2ForaneosModel.getRegistroByIdForaneos(req.params.id);
            if (!registro) {
                return res.status(404).json({ error: 'Registro no encontrado' });
            }
            res.json(registro);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el registro de la bascula 1' });
        }
    },

    //agrega a b2
    getRegistroByIdCamionForaneos: async (req, res) => {
        try {
            // Intentamos obtener el registro del camión
            const registro = await bascula2ForaneosModel.getRegistroByIdCamionForaneos(req.params.idCamion);
            
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


    createRegistroForaneos: async (req, res) => {
        try {
            const registro = await bascula2ForaneosModel.createRegistroForaneos(req.body);
            res.status(201).json({ message: 'Registro creado', id: registro.insertId });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el registro de la bascula 1', details: error.message });
        }
    },

    updateRegistroForaneos: async (req, res) => {
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
    
           
    
            const result = await bascula2ForaneosModel.updateRegistroForaneos(
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
    
    
    getTaraByIdCamionForaneos: async (req, res) => {
        try {
            const idCamion = req.params.idCamion;
            const tara = await bascula2ForaneosModel.getTaraByIdCamionForaneos(idCamion);
            res.json({ tara });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el valor de tara', details: error.message });
        }
    },

    deleteRegistroForaneos: async (req, res) => {
        try {
            const registro = await bascula2ForaneosModel.deleteRegistro(req.params.id);
            res.json({ message: 'Registro eliminado' });
        } catch (error) {        
            res.status(500).json({ error: 'Error al eliminar el registro de la bascula 1' });
        }
    },
    getRegistroByIdOrUsernameForaneos: async (req, res) => {
        try {
            const { id, usuario } = req.query; // Usamos query para id o nombre de usuario

            if (id) {
                // Si se proporciona el id, buscamos por id
                const registro = await bascula2ForaneosModel.getRegistroByIdForaneos(id);
                if (!registro) {
                    return res.status(404).json({ error: 'Registro no encontrado' });
                }
                return res.json(registro);
            } else if (usuario) {
                // Si se proporciona el usuario, buscamos por nombre de usuario
                const registro = await bascula2ForaneosModel.getRegistroByUsuarioForaneos(usuario);
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
            const registro = await bascula2ForaneosModel.RegistrarAperturarB1(req.body);
            res.status(201).json({ message: 'Registro creado', id: registro.insertId });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el registro de apertura de la bascula 1', details: error.message });
        }
    }
};

module.exports = bascula2ForaneosController;