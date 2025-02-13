const bcrypt = require('bcryptjs');
const jwt = require('../auth/auth');  // Asegúrate de importar la función de auth.js
const UserModel = require('../models/user.model');

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.getAllUsers();
            res.json(users);
        } catch (err) {
            console.error('Error al obtener los usuarios:', err);
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
            console.error('Error al obtener el usuario:', err);
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    },

    registerUser: async (req, res) => {
        const { name, password, rol } = req.body;

        if (!name || !password || !rol) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await UserModel.createUser({ name, password: hashedPassword, rol });


            const token = jwt.generateToken(result.insertId, rol);

            res.status(201).json({ message: 'Usuario registrado', token });
        } catch (err) {
            console.error('Error al registrar el usuario:', err);
            res.status(500).json({ error: 'Error al registrar el usuario' });
        }
    },

    loginUser: async (req, res) => {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos' });
        }

        try {
            const user = await UserModel.getUserByName(name);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }

            const token = jwt.generateToken(user.id, user.rol);

            res.json({ message: 'Inicio de sesión exitoso', token });
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    },

    updateUser: async (req, res) => {
        const { nombre, password, rol } = req.body;

        if (!nombre || !password || !rol) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        try {
            const result = await UserModel.updateUser(req.params.id, req.body);
            res.json({ message: 'Usuario actualizado' });
        } catch (err) {
            console.error('Error al actualizar el usuario:', err);
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const result = await UserModel.deleteUser(req.params.id);
            res.json({ message: 'Usuario eliminado' });
        } catch (err) {
            console.error('Error al eliminar el usuario:', err);
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
    },
};

module.exports = UserController;
