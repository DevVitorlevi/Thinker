const Quiz = require('../models/Quizes');

module.exports = class QuizController {
    static async create(req, res) {
        try {
            const { titulo, questoes, materiaId } = req.body;
            if (!titulo || !questoes || !materiaId) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }
            const novoQuiz = new Quiz({ titulo, questoes, materia: materiaId });
            await novoQuiz.save();
            res.status(201).json({ message: 'Quiz criado com sucesso!', quiz: novoQuiz });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar quiz.', error });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { titulo, questoes, materiaId } = req.body;
            const quizAtualizado = await Quiz.findByIdAndUpdate(id, { titulo, questoes, materia: materiaId }, { new: true });

            if (!quizAtualizado) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }
            res.status(200).json({ message: 'Quiz atualizado com sucesso!', quiz: quizAtualizado });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar quiz.', error });
        }
    }

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
};
