const express = require('express');
const router = express.Router();
const adminAuth = require('../helpers/adminAuth');
const QuizController = require('../controllers/QuizController');
const MateriaController = require('../controllers/MateriasControllers');
const QuestaoController = require('../controllers/QuestionsController');
const ConquistaController = require('../controllers/ConquistasController');
const VerifyToken = require('../helpers/verify-token')
const UserController = require('../controllers/UserController')

// CRUD Materias
router.post('/materia', adminAuth, MateriaController.create);
router.put('/materia/:id', adminAuth, MateriaController.update);
router.delete('/materia/:id', adminAuth, MateriaController.delete);

// CRUD Quizzes
router.post('/quiz', adminAuth, QuizController.create);
router.put('/quiz/:id', adminAuth, QuizController.update);
router.delete('/quiz/:id', adminAuth, QuizController.delete);

// CRUD Questões
router.post('/questao', adminAuth, QuestaoController.create);
router.put('/questao/:id', adminAuth, QuestaoController.update);
router.delete('/questao/:id', adminAuth, QuestaoController.delete);

// CRUD Conquistas
router.post('/conquista', adminAuth, ConquistaController.create);
router.put('/conquista/:id', adminAuth, ConquistaController.update);
router.delete('/conquista/:id', adminAuth, ConquistaController.delete);

//CRUD Admin
router.post('/register',VerifyToken,UserController.checkAdminRole,UserController.registerAdmin);
router.post('/login', UserController.loginAdmin);
router.delete('/delete/:id', VerifyToken, UserController.checkAdminRole, UserController.deleteAdmin);


module.exports = router;
