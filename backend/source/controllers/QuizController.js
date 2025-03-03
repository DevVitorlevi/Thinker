const Quiz = require('../models/Quizes');
const User = require('../models/User');
const ConquistaController = require('./ConquistasController');

module.exports = class QuizController {
    // Criar um novo quiz
    static async create(req, res) {
        try {
            const { titulo, questoes, materiaId, tempo_estimado } = req.body;

            if (!titulo || !questoes || !materiaId) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }

            const novoQuiz = new Quiz({ titulo, questoes, materia: materiaId,tempo_estimado });
            await novoQuiz.save();

            res.status(201).json({ message: 'Quiz criado com sucesso!', quiz: novoQuiz });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar quiz.', error });
        }
    }

    // Atualizar um quiz existente
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { titulo, questoes, materiaId,tempo_estimado } = req.body;

            const quizAtualizado = await Quiz.findByIdAndUpdate(
                id,
                { titulo, questoes, materia: materiaId,tempo_estimado },
                { new: true }
            );

            if (!quizAtualizado) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }

            res.status(200).json({ message: 'Quiz atualizado com sucesso!', quiz: quizAtualizado });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar quiz.', error });
        }
    }

    // Deletar um quiz
    static async delete(req, res) {
        try {
            const { id } = req.params;

            const quiz = await Quiz.findByIdAndDelete(id);

            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }

            res.status(200).json({ message: 'Quiz deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar quiz.', error });
        }
    }

    // Completar um quiz
    static async completarQuiz(req, res) {
        try {
            const { quizId, acertos, totalQuestoes } = req.body;
            const userId = req.user.id; // ID do usuário autenticado

            // Busca o quiz no banco de dados
            const quiz = await Quiz.findById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }

            // Busca o usuário no banco de dados
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            // Atualiza as estatísticas do usuário
            user.estatisticas.quizzes_completos += 1;
            user.estatisticas.acertos += acertos;
            user.estatisticas.questoes_feitas += totalQuestoes;

            // Salva as atualizações do usuário
            await user.save();

            // Verifica se o usuário desbloqueou alguma conquista
            await ConquistaController.verificarConquistas(userId);

            res.status(200).json({ message: 'Quiz completado com sucesso!', estatisticas: user.estatisticas });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao completar quiz.', error });
        }
    }
};