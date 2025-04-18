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
// ======================================
router.use(VerifyToken);
router.use(AdminController.checkAdmin);

// ======================================
// ROTAS DE GERENCIAMENTO DE ADMINS
// ======================================
router.post('/admins', AdminController.createAdmin);
router.get('/admins', AdminController.listAdmins);
router.put('/admins/:id', AdminController.updateAdmin);
router.patch('/admins/:id/deactivate', AdminController.deactivateAdmin);

// ======================================
// ROTAS DE GERENCIAMENTO DE CONTEÚDO
// ======================================

// CRUD Matérias
router.post('/materias', MateriaController.create);
router.put('/materias/:id', MateriaController.update);
router.delete('/materias/:id', MateriaController.delete);

// CRUD Quizzes
router.post('/quizzes', QuizController.create);
router.put('/quizzes/:id', QuizController.update);
router.delete('/quizzes/:id', QuizController.delete);

// CRUD Questões
router.post('/questoes', QuestaoController.create);
router.put('/questoes/:id', QuestaoController.update);
router.delete('/questoes/:id', QuestaoController.delete);

// CRUD Conteúdos
router.post('/conteudos', ConteudoController.create);
router.put('/conteudos/:id', ConteudoController.update);
router.delete('/conteudos/:id', ConteudoController.delete);


module.exports = router;