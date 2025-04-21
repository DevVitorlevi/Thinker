const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const VerifyToken = require('../helpers/verify-token');
const { ImageUpload } = require('../helpers/image-up');

// Importações dos controllers
const QuizController = require('../controllers/QuizController');
const MateriaController = require('../controllers/MateriasControllers');
const QuestaoController = require('../controllers/QuestionsController');
const ConteudoController = require('../controllers/ConteudoController');
const RankingController = require('../controllers/RankingController');

// ======================================
// ROTAS PÚBLICAS (sem autenticação)
// ======================================
router.post('/login', AdminController.login);

// ======================================
// MIDDLEWARE DE AUTENTICAÇÃO
// =====================================
// ======================================
// ROTAS DE GERENCIAMENTO DE ADMINS
// ======================================
router.post('/register', AdminController.registerAdmin);
router.patch('/delete/:id',VerifyToken,AdminController.checkAdmin, AdminController.deleteAdmin);

// ======================================
// ROTAS DE GERENCIAMENTO DE CONTEÚDO
// ======================================

// CRUD Matérias
router.post('/materias',VerifyToken,AdminController.checkAdmin, MateriaController.create);
router.put('/materias/:id',VerifyToken,AdminController.checkAdmin, MateriaController.update);
router.delete('/materias/:id',VerifyToken,AdminController.checkAdmin, MateriaController.delete);

// CRUD Quizzes
router.post('/quizzes', VerifyToken,AdminController.checkAdmin, QuizController.create);
router.put('/quizzes/:id',VerifyToken,AdminController.checkAdmin, QuizController.update);
router.delete('/quizzes/:id', VerifyToken,AdminController.checkAdmin,QuizController.delete);

// CRUD Questões
router.post('/questoes', VerifyToken,AdminController.checkAdmin,QuestaoController.create);
router.put('/questoes/:id', VerifyToken,AdminController.checkAdmin,QuestaoController.update);
router.delete('/questoes/:id', VerifyToken,AdminController.checkAdmin,QuestaoController.delete);

// CRUD Conteúdos
router.post('/conteudos', VerifyToken,AdminController.checkAdmin,ConteudoController.create);
router.put('/conteudos/:id', VerifyToken,AdminController.checkAdmin,ConteudoController.update);
router.delete('/conteudos/:id', VerifyToken,AdminController.checkAdmin,ConteudoController.delete);


module.exports = router;