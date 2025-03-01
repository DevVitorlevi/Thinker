const Materias = require('../models/Materias')
const Quiz = require('../models/Quizes')

module.export = class QuizController {
    static async createQuiz(req, res) {
        try {
            const { titulo, questoes, materiaId } = req.body;
            if (!titulo || !questoes || !Array.isArray(questoes) || questoes.length === 0 || !materiaId) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios e questoes deve ser um array.' });
            }
            const materia = await Materias.findById(materiaId);
            if (!materia) {
                return res.status(404).json({ message: 'Matéria não encontrada.' });
            }
            const novoQuiz = new Quiz({ titulo, questoes, materia: materiaId });
            await novoQuiz.save();
            res.status(201).json({ message: 'Quiz criado com sucesso!', quiz: novoQuiz });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar quiz.', error });
        }
    }

    static async getQuizzes(req, res) {
        try {
            const quizzes = await Quiz.find().populate('questoes').populate('materia');
            res.status(200).json(quizzes);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar quizzes.', error });
        }
    }
}