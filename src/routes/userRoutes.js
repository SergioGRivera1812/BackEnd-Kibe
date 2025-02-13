const express = require('express');
const UserController = require('../controllers/userController');
const { authenticate } = require('../auth/authMiddleware'); 

const router = express.Router();

// Rutas públicas (registro e inicio de sesión)
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Rutas protegidas (requieren autenticación)
router.get('/', UserController.getAllUsers);
router.get('/:id', authenticate, UserController.getUserById);
router.put('/:id', authenticate, UserController.updateUser);
router.delete('/:id', authenticate, UserController.deleteUser);

module.exports = router;
