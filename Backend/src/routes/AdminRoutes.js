const express = require('express');
const router = express.Router();

const adminAuth = require('../helpers/adminAuth'); // Middleware para autenticação de admin
const VerifyToken = require('../helpers/verify-token'); // Middleware para verificar token
const { ImageUpload } = require('../helpers/image-up');

const QuizController = require('../controllers/QuizController');
const MateriaController = require('../controllers/MateriasControllers');
const QuestaoController = require('../controllers/QuestionsController');
const AdminController = require('../controllers/AdminController');
const RankingController = require('../controllers/RankingController');
const ConteudoController = require('../controllers/ConteudoController'); // Importado ConteudoController

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

// CRUD Admin
router.post('/register', AdminController.registerAdmin);
router.post('/login', AdminController.loginAdmin);
router.delete('/delete/:id', VerifyToken, AdminController.checkAdminRole, AdminController.deleteAdmin);

// CRUD Rankings
router.post('/ranking', adminAuth, AdminController.checkAdminRole, RankingController.createRanking);
router.patch('/ranking/:id', adminAuth, AdminController.checkAdminRole, RankingController.updateRanking);
router.delete('/ranking/:id', adminAuth, AdminController.checkAdminRole, RankingController.deleteRanking);

// CRUD Conteúdos
router.post('/conteudo', adminAuth, VerifyToken, AdminController.checkAdminRole, ImageUpload.array('imagens', 10), ConteudoController.create);
router.get('/conteudo', ConteudoController.getAll);
router.get('/conteudo/:id', ConteudoController.getById);
router.patch('/conteudo/:id', adminAuth, VerifyToken, AdminController.checkAdminRole, ImageUpload.array('imagens', 10), ConteudoController.update);
router.delete('/conteudo/:id', adminAuth, VerifyToken, AdminController.checkAdminRole, ConteudoController.delete);

module.exports = router;
