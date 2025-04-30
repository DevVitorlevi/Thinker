const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const VerifyToken = require('../helpers/verify-token');
const { ImageUpload } = require('../helpers/image-up');
const QuestaoController = require('../controllers/QuestionsController');
const QuizController = require('../controllers/QuizController');

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

module.exports = router;