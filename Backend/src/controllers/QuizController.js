const Quiz = require('../models/Quiz');
const User = require('../models/User');
const Ranking = require('../models/Ranking');

module.exports = class QuizController {
    static async create(req, res) {
        try {
            const { titulo, materiaId } = req.body;
            if (!titulo || !materiaId) return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });

            const novoQuiz = new Quiz({ titulo, materia: materiaId });
            await novoQuiz.save();

            // Atualiza a matéria com o novo quiz
            const materia = await Materia.findById(materiaId);
            if (materia) {
                materia.quizzes.push(novoQuiz._id);
                await materia.save();
            }

            res.status(201).json({ message: 'Quiz criado com sucesso!', quiz: novoQuiz });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar quiz.', error });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { titulo, materiaId } = req.body;

            const quizAtualizado = await Quiz.findByIdAndUpdate(
                id,
                { titulo, materia: materiaId },
                { new: true }
            );

            if (!quizAtualizado) return res.status(404).json({ message: 'Quiz não encontrado.' });
            res.status(200).json({ message: 'Quiz atualizado com sucesso!', quiz: quizAtualizado });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar quiz.', error });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const quiz = await Quiz.findByIdAndDelete(id);
            if (!quiz) return res.status(404).json({ message: 'Quiz não encontrado.' });

            // Remove o quiz da matéria associada
            const materia = await Materia.findById(quiz.materia);
            if (materia) {
                materia.quizzes.pull(id);
                await materia.save();
            }

            res.status(200).json({ message: 'Quiz deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar quiz.', error });
        }
    }

    static async completarQuiz(req, res) {
        try {
            const { quizId } = req.body;
            const userId = req.user.id;

            const quiz = await Quiz.findById(quizId).populate('questoes');
            if (!quiz) return res.status(404).json({ message: 'Quiz não encontrado.' });

            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

            let pontosObtidos = 0;
            for (const questao of quiz.questoes) {
                const respostaUsuario = questao.respondida_por.find(resposta => resposta.user.toString() === userId);
                if (respostaUsuario && respostaUsuario.acertou) {
                    switch (questao.dificuldade) {
                        case 'facil': pontosObtidos += 5; break;
                        case 'medio': pontosObtidos += 10; break;
                        case 'dificil': pontosObtidos += 15; break;
                    }
                }
            }

            pontosObtidos += 50; // Bônus por completar o quiz

            user.estatisticas.quizzes_completos += 1;
            user.estatisticas.acertos += quiz.questoes.filter(q => 
                q.respondida_por.some(r => r.user.toString() === userId && r.acertou)
            ).length;
            user.estatisticas.questoes_feitas += quiz.questoes.length;
            user.pontos += pontosObtidos;

            // Atualiza o ranking
            const rankings = await Ranking.find().sort({ pontosNecessarios: 1 });
            for (const ranking of rankings) {
                if (user.pontos >= ranking.pontosNecessarios) {
                    user.ranking = ranking.nome;
                }
            }

            await user.save();
            res.status(200).json({ 
                message: 'Quiz completado com sucesso!', 
                estatisticas: user.estatisticas, 
                pontos: user.pontos, 
                ranking: user.ranking 
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao completar quiz.', error });
        }
    }
};