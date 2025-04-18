const express = require('express');
const router = express.Router();

// Middlewares
const adminAuth = require('../helpers/adminAuth');
const VerifyToken = require('../helpers/verify-token');
const { ImageUpload } = require('../helpers/image-up');

// Controllers
const QuizController = require('../controllers/QuizController');
const MateriaController = require('../controllers/MateriasControllers');
const QuestaoController = require('../controllers/QuestaoController');
const AdminController = require('../controllers/AdminController');
const RankingController = require('../controllers/RankingController');
const ConteudoController = require('../controllers/ConteudosController');

// Middleware de verificação de admin (corrigido)
const checkAdmin = [adminAuth, AdminController.checkAdminRole];

// =============== CRUD Matérias ===============
router.post('/materia', ...checkAdmin, MateriaController.create);
router.patch('/materia/:id', ...checkAdmin, MateriaController.update);
router.delete('/materia/:id', ...checkAdmin, MateriaController.delete);

// =============== CRUD Quizzes ===============
router.post('/quiz', ...checkAdmin, QuizController.create);
router.patch('/quiz/:id', ...checkAdmin, QuizController.update);
router.delete('/quiz/:id', ...checkAdmin, QuizController.delete);

// =============== CRUD Questões ===============
router.post('/questao', ...checkAdmin, QuestaoController.create);
router.patch('/questao/:id', ...checkAdmin, QuestaoController.update);
router.delete('/questao/:id', ...checkAdmin, QuestaoController.delete);

// =============== CRUD Admin ===============
router.post('/register', AdminController.registerAdmin);
router.post('/login', AdminController.loginAdmin);
router.delete('/delete/:id', VerifyToken, ...checkAdmin, AdminController.deleteAdmin);

// =============== CRUD Rankings ===============
router.post('/ranking', ...checkAdmin, RankingController.createRanking);
router.patch('/ranking/:id', ...checkAdmin, RankingController.updateRanking);
router.delete('/ranking/:id', ...checkAdmin, RankingController.deleteRanking);

// =============== CRUD Conteúdos ===============
router.post('/conteudo', ...checkAdmin, VerifyToken, ImageUpload.array('imagens', 10), ConteudoController.create);
router.get('/conteudo', ConteudoController.getAll);
router.get('/conteudo/:id', ConteudoController.getById);
router.patch('/conteudo/:id', ...checkAdmin, VerifyToken, ImageUpload.array('imagens', 10), ConteudoController.update);
router.delete('/conteudo/:id', ...checkAdmin, VerifyToken, ConteudoController.delete);
console.log('Verificando middlewares:');
console.log('adminAuth:', typeof adminAuth);
console.log('VerifyToken:', typeof VerifyToken);
console.log('ImageUpload.array:', typeof ImageUpload?.array);
console.log('AdminController.checkAdminRole:', typeof AdminController?.checkAdminRole);
module.exports = router;