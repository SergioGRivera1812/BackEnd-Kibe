const UserModel = require('../models/user.model');  // Ajusta el path si es necesario

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await UserModel.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    },

    createUser: async (req, res) => {
        try {
            const result = await UserModel.createUser(req.body);
            res.status(201).json({ message: 'Usuario creado', userId: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const result = await UserModel.updateUser(req.params.id, req.body);
            res.json({ message: 'Usuario actualizado' });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const result = await UserModel.deleteUser(req.params.id);
            res.json({ message: 'Usuario eliminado' });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
    },
};

module.exports = UserController;
