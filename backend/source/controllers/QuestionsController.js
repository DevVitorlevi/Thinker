const Questao = require('../models/Questions');

module.exports = class QuestaoController {
    static async create(req, res) {
        try {
            const { enunciado, alternativas, respostaCorreta, quizId } = req.body;
            if (!enunciado || !alternativas || !respostaCorreta || !quizId) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }
            const novaQuestao = new Questao({ enunciado, alternativas, respostaCorreta, quiz: quizId });
            await novaQuestao.save();
            res.status(201).json({ message: 'Questão criada com sucesso!', questao: novaQuestao });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar questão.', error });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { enunciado, alternativas, respostaCorreta } = req.body;
            const questaoAtualizada = await Questao.findByIdAndUpdate(id, { enunciado, alternativas, respostaCorreta }, { new: true });

            if (!questaoAtualizada) {
                return res.status(404).json({ message: 'Questão não encontrada.' });
            }
            res.status(200).json({ message: 'Questão atualizada com sucesso!', questao: questaoAtualizada });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar questão.', error });
        }
    }

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
};
