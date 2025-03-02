const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const QuizController = require('../controllers/QuizController');
const MateriaController = require('../controllers/MateriasControllers');
const QuestaoController = require('../controllers/QuestionsController');
const ConquistaController = require('../controllers/ConquistasController');

// CRUD Materias
router.post('/materia', adminAuth, MateriaController.create);
router.put('/materia/:id', adminAuth, MateriaController.update);
router.delete('/materia/:id', adminAuth, MateriaController.delete);

// CRUD Quizzes
router.post('/quiz', adminAuth, QuizController.create);
router.put('/quiz/:id', adminAuth, QuizController.update);
router.delete('/quiz/:id', adminAuth, QuizController.delete);

// CRUD Questões
router.post('/questao', adminAuth, QuestaoController.create);
router.put('/questao/:id', adminAuth, QuestaoController.update);
router.delete('/questao/:id', adminAuth, QuestaoController.delete);

// CRUD Conquistas
router.post('/conquista', userAuth, ConquistaController.create);
router.put('/conquista/:id', userAuth, ConquistaController.update);
router.delete('/conquista/:id', userAuth, ConquistaController.delete);


module.exports = router;
