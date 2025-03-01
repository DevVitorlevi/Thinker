const express = require('express');
const router = express.Router();
const adminAuth = require('../helpers/adminAuth'); // Middleware para autenticação de admin
const VerifyToken = require('../helpers/verify-token'); // Middleware para verificar token
const QuizController = require('../controllers/QuizController');
const MateriaController = require('../controllers/MateriasControllers');
const QuestaoController = require('../controllers/QuestionsController');
const ConquistaController = require('../controllers/ConquistasController');

const AdminController =require('../controllers/AdminController')

// CRUD Matérias
router.post('/materia', adminAuth, AdminController.checkAdminRole, MateriaController.create);
router.patch('/materia/:id', adminAuth, AdminController.checkAdminRole, MateriaController.update);
router.delete('/materia/:id', adminAuth, AdminController.checkAdminRole, MateriaController.delete);

// CRUD Quizzes
router.post('/quiz', adminAuth, AdminController.checkAdminRole, QuizController.create);
router.patch('/quiz/:id', adminAuth, AdminController.checkAdminRole, QuizController.update);
router.delete('/quiz/:id', adminAuth, AdminController.checkAdminRole, QuizController.delete);

// CRUD Questões
router.post('/questao', adminAuth, AdminController.checkAdminRole, QuestaoController.create);
router.patch('/questao/:id', adminAuth, AdminController.checkAdminRole, QuestaoController.update);
router.delete('/questao/:id', adminAuth, AdminController.checkAdminRole, QuestaoController.delete);

// CRUD Conquistas
router.post('/conquista', adminAuth, AdminController.checkAdminRole, ConquistaController.create);
router.patch('/conquista/:id', adminAuth, AdminController.checkAdminRole, ConquistaController.update);
router.delete('/conquista/:id', adminAuth, AdminController.checkAdminRole, ConquistaController.delete);

// CRUD Admin
router.post('/register', VerifyToken, AdminController.checkAdminRole, AdminController.registerAdmin);
router.post('/login', AdminController.loginAdmin);
router.delete('/delete/:id', VerifyToken, AdminController.checkAdminRole, AdminController.deleteAdmin);

module.exports = router;