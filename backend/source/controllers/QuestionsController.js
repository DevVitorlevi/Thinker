const Questao = require('../models/Questions');
const User = require('../models/User');
const ConquistaController = require('./ConquistasController');

module.exports = class QuestaoController {
    // Criar uma nova questão
    static async create(req, res) {
        try {
            const { pergunta, alternativas, respostaCorreta, quizId } = req.body;

            if (!pergunta || !alternativas || !respostaCorreta || !quizId) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }

            const novaQuestao = new Questao({ pergunta, alternativas, respostaCorreta, quiz: quizId });
            await novaQuestao.save();

            res.status(201).json({ message: 'Questão criada com sucesso!', questao: novaQuestao });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar questão.', error });
        }
    }

    // Atualizar uma questão existente
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { pergunta, alternativas, respostaCorreta } = req.body;

            const questaoAtualizada = await Questao.findByIdAndUpdate(
                id,
                { pergunta, alternativas, respostaCorreta },
                { new: true }
            );

            if (!questaoAtualizada) {
                return res.status(404).json({ message: 'Questão não encontrada.' });
            }

            res.status(200).json({ message: 'Questão atualizada com sucesso!', questao: questaoAtualizada });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar questão.', error });
        }
    }

    // Deletar uma questão
    static async delete(req, res) {
        try {
            const { id } = req.params;

            const questao = await Questao.findByIdAndDelete(id);

            if (!questao) {
                return res.status(404).json({ message: 'Questão não encontrada.' });
            }

            res.status(200).json({ message: 'Questão deletada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar questão.', error });
        }
    }

    // Responder uma questão
    static async responderQuestao(req, res) {
        try {
            const { questaoId, acertou } = req.body;
            const userId = req.user.id;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            // Atualizar estatísticas
            user.estatisticas.questoes_feitas += 1;
            if (acertou) {
                user.estatisticas.acertos += 1;
            }

            await user.save();

            // Verificar conquistas
            await ConquistaController.verificarConquistas(userId);

            res.status(200).json({ message: 'Questão respondida com sucesso!', estatisticas: user.estatisticas });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao responder questão.', error });
        }
    }
};