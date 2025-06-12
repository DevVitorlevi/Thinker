const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const Materia = require('../models/Materias');
const Questao = require('../models/Questions'); 

function calcularPatente(pontos) {
    if (pontos >= 1000) return '🧠 O THINKER';
    if (pontos >= 700) return 'Gênio da Mente Dourada';
    if (pontos >= 400) return 'Mestre dos Quizzes';
    if (pontos >= 200) return 'Decifrador de Desafios';
    return 'Aprendiz do Conhecimento';
}

module.exports = class QuizController {
    static async create(req, res) {
        try {
            const { titulo, materiaId } = req.body;
            if (!titulo || !materiaId) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }
            if (!mongoose.Types.ObjectId.isValid(materiaId)) {
                return res.status(400).json({ message: 'ID da matéria inválido.' });
            }
            const novoQuiz = new Quiz({ titulo, materia: materiaId, questoes: [] });
            await novoQuiz.save();
            const materia = await Materia.findById(materiaId);
            if (materia) {
                materia.quizzes.push(novoQuiz._id);
                await materia.save();
            }
            res.status(201).json({ message: 'Quiz criado com sucesso!', quiz: novoQuiz });
        } catch (error) {
            console.error('Erro ao criar quiz:', error);
            res.status(500).json({ message: 'Erro ao criar quiz.', error: error.message || 'Erro desconhecido.' });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { titulo, questoes, materiaId, tempo_estimado } = req.body;
            if (questoes) {
                for (const qId of questoes) {
                    if (!mongoose.Types.ObjectId.isValid(qId)) {
                        return res.status(400).json({ message: 'ID inválido em questoes.' });
                    }
                }
            }
            const quizAtualizado = await Quiz.findByIdAndUpdate(
                id,
                { titulo, questoes, materia: materiaId, tempo_estimado },
                { new: true }
            );
            if (!quizAtualizado) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }
            res.status(200).json({ message: 'Quiz atualizado com sucesso!', quiz: quizAtualizado });
        } catch (error) {
            console.error('Erro ao atualizar quiz:', error);
            res.status(500).json({ message: 'Erro ao atualizar quiz.', error: error.message || 'Erro desconhecido.' });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const quiz = await Quiz.findById(id);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }
            const materia = await Materia.findById(quiz.materia);
            if (materia) {
                materia.quizzes.pull(quiz._id);
                await materia.save();
                console.log(`Quiz ${quiz._id} removido da Matéria ${materia._id}.`);
            } else {
                console.log(`Matéria ${quiz.materia} não encontrada.`);
            }
            await Quiz.findByIdAndDelete(id);
            res.status(200).json({ message: 'Quiz deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar quiz:', error);
            res.status(500).json({ message: 'Erro ao deletar quiz.', error: error.message || 'Erro desconhecido.' });
        }
    }

    static async completarQuiz(req, res) {
        try {
            const { quizId, respostas } = req.body;
            const userId = req.user.id;

            if (!Array.isArray(respostas)) {
                return res.status(400).json({ message: 'Respostas inválidas.' });
            }

            const quiz = await Quiz.findById(quizId).populate('questoes');
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }

            let acertos = 0;
            let pontosQuiz = 0;

            quiz.questoes.forEach(questao => {
                const respostaUsuario = respostas.find(r => r.questaoId === questao._id.toString());
                if (respostaUsuario && respostaUsuario.resposta === questao.respostaCorreta) {
                    acertos++;
                    if (questao.dificuldade === 'facil') pontosQuiz += 5;
                    else if (questao.dificuldade === 'medio') pontosQuiz += 10;
                    else if (questao.dificuldade === 'dificil') pontosQuiz += 20;
                }
            });

            pontosQuiz += 20; // bônus por completar
            if (acertos === quiz.questoes.length) {
                pontosQuiz += 100; // bônus por gabaritar
            }

            const user = await User.findById(userId);
            user.pontos += pontosQuiz;
            user.patente = calcularPatente(user.pontos);
            user.estatisticas.quizzes_completos += 1;
            user.estatisticas.acertos += acertos;
            user.estatisticas.questoes_feitas += quiz.questoes.length;

            user.quizzes_respondidos.push({
                quiz: quizId,
                acertos,
                total_questoes: quiz.questoes.length,
                pontos_ganhos: pontosQuiz
            });

            await user.save();

            res.status(200).json({
                message: 'Quiz completado!',
                acertos,
                total: quiz.questoes.length,
                pontosGanhos: pontosQuiz,
                patenteAtual: user.patente
            });
        } catch (error) {
            console.error('Erro ao completar quiz:', error);
            res.status(500).json({ message: 'Erro ao completar quiz.', error: error.message || 'Erro desconhecido.' });
        }
    }

    static async getAll(req, res) {
        try {
            const quizzes = await Quiz.find()
                .populate('materia', 'nome descricao')
                .populate({
                    path: 'questoes',
                    select: 'pergunta dificuldade',
                    options: { sort: { dificuldade: 1 }, limit: 5 }
                })
                .sort({ createdAt: -1 });

            const quizzesComStats = await Promise.all(quizzes.map(async (quiz) => {
                const counts = await Questao.aggregate([
                    { $match: { quiz: quiz._id } },
                    { $group: { _id: '$dificuldade', count: { $sum: 1 } } }
                ]);
                return {
                    ...quiz.toObject(),
                    stats: {
                        facil: counts.find(c => c._id === 'facil')?.count || 0,
                        medio: counts.find(c => c._id === 'medio')?.count || 0,
                        dificil: counts.find(c => c._id === 'dificil')?.count || 0
                    }
                };
            }));

            res.status(200).json({
                message: 'Quizzes recuperados com sucesso!',
                count: quizzes.length,
                quizzes: quizzesComStats
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar quizzes.', error: error.message });
        }
    }
};
