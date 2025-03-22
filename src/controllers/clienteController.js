const ClienteModel = require('../models/cliente.model');

const ClienteController = {
     getAllClientes: async (req, res) => {
            try {
                const product = await ClienteModel.getAllClientes();
                res.json(product);
            } catch (err) {
                res.status(500).json({ error: 'Error al obtener la lista de clientes' });
            }
        }
}
module.exports = ClienteController;
