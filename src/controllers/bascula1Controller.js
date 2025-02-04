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
            const { bruto, neto, fechaS, horaS,activo } = req.body;
            const idCamion = req.params.idCamion; 

            const result = await bascula1Model.updateRegistro(idCamion, bruto, neto, fechaS, horaS,activo);
            res.status(200).json({ message: 'Registro actualizado', result: result.affectedRows });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el registro de la bascula 1' });
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
    }
};

module.exports = bascula1Controller;