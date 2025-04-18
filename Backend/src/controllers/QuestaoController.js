const Questao = require('../models/Questions');
const Quiz = require('../models/Quizes');
const User = require('../models/User');

module.exports = class QuestaoController {
    // Criar questão
    static async create(req, res) {
        const { pergunta, alternativas, respostaCorreta, quizId, dificuldade } = req.body;

        if (!pergunta || !alternativas || !respostaCorreta || !quizId) {
            return res.status(422).json({ message: 'Preencha todos os campos.' });
        }

        try {
            const quiz = await Quiz.findById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }

            const novaQuestao = new Questao({
                pergunta,
                alternativas,
                respostaCorreta,
                quiz: quizId,
                dificuldade: dificuldade || 'medio'
            });

            await novaQuestao.save();
            
            // Atualiza o quiz com a nova questão
            quiz.questoes.push(novaQuestao._id);
            await quiz.save();

            res.status(201).json({
                message: 'Questão criada!',
                questao: novaQuestao
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar questão.', error });
        }
    }

    // Atualizar questão
    static async update(req, res) {
        const { id } = req.params;
        const { pergunta, alternativas, respostaCorreta, dificuldade } = req.body;

        try {
            const questao = await Questao.findById(id);
            if (!questao) {
                return res.status(404).json({ message: 'Questão não encontrada.' });
            }

            if (pergunta) questao.pergunta = pergunta;
            if (alternativas) questao.alternativas = alternativas;
            if (respostaCorreta) questao.respostaCorreta = respostaCorreta;
            if (dificuldade) questao.dificuldade = dificuldade;

            await questao.save();
            res.status(200).json({
                message: 'Questão atualizada!',
                questao
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar.', error });
        }
    }

    // Deletar questão
    static async delete(req, res) {
        const { id } = req.params;

        try {
            const questao = await Questao.findById(id);
            if (!questao) {
                return res.status(404).json({ message: 'Questão não encontrada.' });
            }

            // Remove a questão do quiz associado
            const quiz = await Quiz.findById(questao.quiz);
            if (quiz) {
                quiz.questoes.pull(id);
                await quiz.save();
            }

            await Questao.findByIdAndDelete(id);
            res.status(200).json({ message: 'Questão removida!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar.', error });
        }
    }

    // Responder questão
    static async responderQuestao(req, res) {
        const { questaoId, resposta } = req.body;
        const userId = req.user.id;

        try {
            const questao = await Questao.findById(questaoId);
            if (!questao) {
                return res.status(404).json({ message: 'Questão não encontrada.' });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            const acertou = resposta === questao.respostaCorreta;
            
            // Registra a resposta
            questao.respondida_por.push({
                user: userId,
                acertou,
                data: new Date()
            });

            // Atualiza estatísticas do usuário
            user.estatisticas.questoes_feitas += 1;
            if (acertou) user.estatisticas.acertos += 1;

            await Promise.all([questao.save(), user.save()]);

            res.status(200).json({
                message: acertou ? 'Resposta correta!' : 'Resposta incorreta!',
                acertou,
                respostaCorreta: questao.respostaCorreta
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao responder.', error });
        }
    }

    // Listar questões por quiz (novo método adicionado)
    static async getByQuiz(req, res) {
        const { quizId } = req.params;

        try {
            const questoes = await Questao.find({ quiz: quizId });
            res.status(200).json({ questoes });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar questões.', error });
        }
    }
};