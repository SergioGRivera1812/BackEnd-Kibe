const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
