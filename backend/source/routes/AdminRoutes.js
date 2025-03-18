const express = require('express');
const router = express.Router();
const adminAuth = require('../helpers/adminAuth'); // Middleware para autenticação de admin
const VerifyToken = require('../helpers/verify-token'); // Middleware para verificar token
const QuizController = require('../controllers/QuizController');
const MateriaController = require('../controllers/MateriasControllers');
const QuestaoController = require('../controllers/QuestionsController');
const AdminController = require('../controllers/AdminController');
const RankingController = require('../controllers/RankingController'); // Importar o RankingController
const ConteudoController = require("../controllers/ConteudoController")


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

// CRUD Rankings (apenas admin)
router.post('/ranking', adminAuth, AdminController.checkAdminRole, RankingController.createRanking); // Criar ranking
router.patch('/ranking/:id', adminAuth, AdminController.checkAdminRole, RankingController.updateRanking); // Atualizar ranking
router.delete('/ranking/:id', adminAuth, AdminController.checkAdminRole, RankingController.deleteRanking); // Deletar ranking

// CRUD Conteudo (apenas admin)
router.post('/conteudo', adminAuth, AdminController.checkAdminRole, ConteudoController.createConteudo); // Criar conteudo
router.patch('/conteudo/:id', adminAuth, AdminController.checkAdminRole, ConteudoController.updateConteudo); // Atualizar conteudo
router.delete('/conteudo/:id', adminAuth, AdminController.checkAdminRole, ConteudoController.deleteConteudo); // Deletar conteudo
module.exports = router;