const Questao = require('../models/Questao');
const Quiz = require('../models/Quiz');

module.exports = class QuestaoController {
    static async create(req, res) {
        try {
            const { pergunta, alternativas, respostaCorreta, quizId, dificuldade } = req.body;

            if (!pergunta || !alternativas || !respostaCorreta || !quizId) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }

            const novaQuestao = new Questao({ pergunta, alternativas, respostaCorreta, quiz: quizId, dificuldade });
            await novaQuestao.save();

            // Adiciona a questão ao quiz
            const quiz = await Quiz.findById(quizId);
            if (quiz) {
                quiz.questoes.push(novaQuestao._id);
                await quiz.save();
            }

            res.status(201).json({ message: 'Questão criada com sucesso!', questao: novaQuestao });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar questão.', error });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { pergunta, alternativas, respostaCorreta, dificuldade } = req.body;

            const questaoAtualizada = await Questao.findByIdAndUpdate(
                id,
                { pergunta, alternativas, respostaCorreta, dificuldade },
                { new: true }
            );

            if (!questaoAtualizada) return res.status(404).json({ message: 'Questão não encontrada.' });
            res.status(200).json({ message: 'Questão atualizada com sucesso!', questao: questaoAtualizada });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar questão.', error });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const questao = await Questao.findByIdAndDelete(id);
            if (!questao) return res.status(404).json({ message: 'Questão não encontrada.' });

            // Remove a questão do quiz associado
            const quiz = await Quiz.findById(questao.quiz);
            if (quiz) {
                quiz.questoes.pull(id);
                await quiz.save();
            }

            res.status(200).json({ message: 'Questão deletada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar questão.', error });
        }
    }

    static async responderQuestao(req, res) {
        try {
            const { questaoId, acertou } = req.body;
            const userId = req.user.id;

            const questao = await Questao.findById(questaoId);
            if (!questao) return res.status(404).json({ message: 'Questão não encontrada.' });

            questao.respondida_por.push({ user: userId, acertou, data: new Date() });
            await questao.save();

            res.status(200).json({ message: 'Questão respondida com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao responder questão.', error });
        }
    }
};