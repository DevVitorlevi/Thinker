// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/QuizController');

// Rota pública para buscar todos os quizzes
router.get('/', QuizController.getAll);

module.exports = router;
