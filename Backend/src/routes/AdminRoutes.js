const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const VerifyToken = require('../helpers/verify-token');
const QuizController = require('../controllers/QuizController');
const MateriaController = require('../controllers/MateriasControllers');
const QuestaoController = require('../controllers/QuestionsController');

// CRUD Matérias
router.post('/materia', VerifyToken, AdminController.checkAdminRole, MateriaController.create);
router.patch('/materia/:id', VerifyToken, AdminController.checkAdminRole, MateriaController.update);
router.delete('/materia/:id', VerifyToken, AdminController.checkAdminRole, MateriaController.delete);

// CRUD Quizzes
router.post('/quiz', VerifyToken, AdminController.checkAdminRole, QuizController.create);
router.patch('/quiz/:id', VerifyToken, AdminController.checkAdminRole, QuizController.update);
router.delete('/quiz/:id', VerifyToken, AdminController.checkAdminRole, QuizController.delete);

// CRUD Questões
router.post('/questao', VerifyToken, AdminController.checkAdminRole, QuestaoController.create);
router.patch('/questao/:id', VerifyToken, AdminController.checkAdminRole, QuestaoController.update);
router.delete('/questao/:id', VerifyToken, AdminController.checkAdminRole, QuestaoController.delete);

// Admin Auth
router.post('/register', AdminController.registerAdmin);
router.post('/login', AdminController.loginAdmin);
router.delete('/delete/:id', VerifyToken, AdminController.checkAdminRole, AdminController.deleteAdmin);


// Consultas Admin
router.get('/materias', VerifyToken, AdminController.checkAdminRole, MateriaController.getAll);
router.get('/quizzes', VerifyToken, AdminController.checkAdminRole, QuizController.getAll);
router.get('/questoes', VerifyToken, AdminController.checkAdminRole, QuestaoController.getAll)


module.exports = router;