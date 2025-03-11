const CamionModel = require('../models/Camion.model');

const CamionController = {
    getAllBus: async (req, res) => {
        try {
            const bus = await CamionModel.getAllBus();
            res.json(bus);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener la lista de unidades' });
        }
    },

    getBusById: async (req, res) => {
        try {
            const bus = await CamionModel.getBusById(req.params.id);
            res.json(bus);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener la unidad' });
        }
    },

    createBus: async (req, res) => {
        try {
            const result = await CamionModel.createBus(req.body);
            res.status(201).json({ message: 'Unidad crerada', busId: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Error al crear la unidad' });
        }
    },

    updateBus: async (req, res) => {
        try {
            const result = await CamionModel.updateBus(req.params.id, req.body);
            res.json({ message: 'Unidad actualizada' });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar la unidad' });
        }
    },

    deleteBus: async (req, res) => {
        try {
            const result = await CamionModel.deleteBus(req.params.id);
            res.json({ message: 'Unidad eliminada' });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar la unidad' });
        }
    },
    getBusByTag: async (req, res) => {
        try {
            const bus = await CamionModel.getBusByTag(req.params.tag);
            if (!bus) {
                return res.status(404).json({ error: 'Unidad no encontrada con ese tag' });
            }
            res.json(bus);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener la unidad por tag' });
        }
    }
};

module.exports = CamionController;
