const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const VerifyToken = require('../helpers/verify-token');
const { ImageUpload } = require('../helpers/image-up');
const QuestaoController = require('../controllers/QuestionsController');
const QuizController = require('../controllers/QuizController');
const ConteudoController = require('../controllers/ConteudoController');

// Auth
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', VerifyToken, UserController.checkUser);

// User Profile
router.get('/:id', VerifyToken, UserController.getUser);
router.patch('/edit/:id', VerifyToken, ImageUpload.single('image'), UserController.editUser);

// Quiz Interactions
router.post('/responder', VerifyToken, QuestaoController.responderQuestao);
router.post('/completar-quiz', VerifyToken, QuizController.completarQuiz);

router.get('/conteudos/:materiaId', VerifyToken, ConteudoController.getByMateria);
router.get('/conteudo/:id', VerifyToken, ConteudoController.getById);

module.exports = router;