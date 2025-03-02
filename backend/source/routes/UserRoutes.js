const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const VerifyToken = require('../helpers/verify-token'); // Middleware para verificar token
const { ImageUpload } = require('../helpers/image-up'); // Middleware para upload de imagem

// Registrar um novo usuário
router.post('/register', UserController.register);

// Autenticar um usuário
router.post('/login', UserController.login);

// Verificar usuário autenticado
router.get('/checkuser', VerifyToken, UserController.checkUser);

// Obter informações de um usuário
router.get('/:id', VerifyToken, UserController.getUser);

// Editar informações do usuário (foto de perfil)
router.patch('/edit/:id', VerifyToken, ImageUpload.single('image'), UserController.editUser);

module.exports = router;