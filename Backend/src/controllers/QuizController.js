const Quiz = require('../models/Quizes');
const Materia = require('../models/Materias');
const User = require('../models/User');

module.exports = class QuizController {
    // Criar quiz
    static async create(req, res) {
        const { titulo, materiaId, tempo_estimado } = req.body;

        if (!titulo || !materiaId) {
            return res.status(422).json({ message: 'Título e matéria são obrigatórios.' });
        }

        try {
            const materia = await Materia.findById(materiaId);
            if (!materia) {
                return res.status(404).json({ message: 'Matéria não encontrada.' });
            }

            const novoQuiz = new Quiz({
                titulo,
                materia: materiaId,
                tempo_estimado: tempo_estimado || 0
            });

            await novoQuiz.save();
            
            // Atualiza a matéria com o novo quiz
            materia.quizzes.push(novoQuiz._id);
            await materia.save();

            res.status(201).json({
                message: 'Quiz criado!',
                quiz: novoQuiz
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar quiz.', error });
        }
    }

    // Atualizar quiz
    static async update(req, res) {
        const { id } = req.params;
        const { titulo, materiaId, tempo_estimado } = req.body;

        try {
            const quiz = await Quiz.findById(id);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }

            if (titulo) quiz.titulo = titulo;
            if (materiaId) quiz.materia = materiaId;
            if (tempo_estimado) quiz.tempo_estimado = tempo_estimado;

            await quiz.save();
            res.status(200).json({
                message: 'Quiz atualizado!',
                quiz
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar.', error });
        }
    }

    // Deletar quiz
    static async delete(req, res) {
        const { id } = req.params;

        try {
            const quiz = await Quiz.findById(id);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }

            // Remove o quiz da matéria associada
            const materia = await Materia.findById(quiz.materia);
            if (materia) {
                materia.quizzes.pull(id);
                await materia.save();
            }

            await Quiz.findByIdAndDelete(id);
            res.status(200).json({ message: 'Quiz removido!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar.', error });
        }
    }

    // Completar quiz
    static async completarQuiz(req, res) {
        const { quizId, acertos, totalQuestoes } = req.body;
        const userId = req.user.id;

        try {
            const quiz = await Quiz.findById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            // Registra a conclusão
            quiz.completado_por.push({
                user: userId,
                acertos,
                total_questoes: totalQuestoes,
                data: new Date()
            });

            // Atualiza estatísticas do usuário
            user.estatisticas.quizzes_completos += 1;
            user.estatisticas.acertos += acertos;
            user.estatisticas.questoes_feitas += totalQuestoes;

            // Registra no histórico do usuário
            user.quizzes_respondidos.push({
                quiz: quizId,
                acertos,
                total_questoes: totalQuestoes,
                data: new Date()
            });

            await Promise.all([quiz.save(), user.save()]);

            res.status(200).json({
                message: 'Quiz completado!',
                estatisticas: user.estatisticas
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao completar quiz.', error });
        }
    }

    // Listar quizzes por matéria (novo método adicionado)
    static async getByMateria(req, res) {
        const { materiaId } = req.params;

        try {
            const quizzes = await Quiz.find({ materia: materiaId }).populate('questoes');
            res.status(200).json({ quizzes });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar quizzes.', error });
        }
    }

    // Obter quiz com questões (novo método adicionado)
    static async getWithQuestions(req, res) {
        const { id } = req.params;

        try {
            const quiz = await Quiz.findById(id)
                .populate('questoes')
                .populate('materia', 'nome');

            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }

            res.status(200).json({ quiz });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar quiz.', error });
        }
    }
};