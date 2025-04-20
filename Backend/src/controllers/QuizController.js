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
    
    // Método completarQuiz atualizado
    static async completarQuiz(req, res) {
        const { quizId, respostas } = req.body; // Agora recebe array de respostas
        const userId = req.user.id;
        try {
            const quiz = await Quiz.findById(quizId).populate('questoes');
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            // Calcula pontuação
            let pontos = 0;
            let acertos = 0;
            
            quiz.questoes.forEach((questao, index) => {
                if (respostas[index] === questao.respostaCorreta) {
                    acertos++;
                    switch(questao.dificuldade) {
                        case 'facil': pontos += 5; break;
                        case 'medio': pontos += 10; break;
                        case 'dificil': pontos += 15; break;
                    }
                }
            });

            // Adiciona bônus por completar o quiz
            pontos += 15;

            // Verifica se já fez o quiz antes
            const quizExistenteIndex = user.quizzes_respondidos.findIndex(q => q.quiz.equals(quizId));
            
            if (quizExistenteIndex >= 0) {
                // Atualiza somente se a pontuação for maior
                if (pontos > user.quizzes_respondidos[quizExistenteIndex].pontos_obtidos) {
                    user.quizzes_respondidos[quizExistenteIndex] = {
                        quiz: quizId,
                        data: new Date(),
                        acertos,
                        total_questoes: quiz.questoes.length,
                        pontos_obtidos: pontos
                    };
                }
            } else {
                user.quizzes_respondidos.push({
                    quiz: quizId,
                    acertos,
                    total_questoes: quiz.questoes.length,
                    pontos_obtidos: pontos
                });
            }

            // Atualiza estatísticas
            user.estatisticas.quizzes_completos += 1;
            user.estatisticas.acertos += acertos;
            user.estatisticas.questoes_feitas += quiz.questoes.length;

            // Salva usuário primeiro
            await user.save();

            // Atualiza ranking (usa a maior pontuação)
            const userUpdated = await RankingController.atualizarPontuacao(userId, user.estatisticas.pontos);

            res.status(200).json({
                message: 'Quiz completado!',
                acertos,
                totalQuestoes: quiz.questoes.length,
                pontos,
                ranking: userUpdated.estatisticas.ranking
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