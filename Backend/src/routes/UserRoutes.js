const express = require('express');
const router = express.Router();
const User = require('../models/User')
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


// Verificar progresso:
router.get('/progresso/:id', VerifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('pontos patente estatisticas quizzes_respondidos');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar progresso.' });
    }
});
module.exports = router;