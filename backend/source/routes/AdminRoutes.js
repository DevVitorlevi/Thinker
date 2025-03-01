const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const QuizController = require('../controllers/QuizController');
const MateriaController = require('../controllers/MateriaController');
const QuestaoController = require('../controllers/QuestaoController');

// Apenas admins podem acessar essas rotas
router.post('/materia', adminAuth, MateriaController.create);
router.post('/quiz', adminAuth, QuizController.create);
router.post('/questao', adminAuth, QuestaoController.create);

module.exports = router;