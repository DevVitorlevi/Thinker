const Questao = require("../models/Questions")
const Quiz = require('../models/Quizes')

module.export = class QuestaoController {
    static async createQuestao(req, res) {
        try {
            const { pergunta, alternativas, respostaCorreta, quizId } = req.body;
            if (!pergunta || !alternativas || !respostaCorreta || !quizId) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }
            const quiz = await Quiz.findById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }
            const novaQuestao = new Questao({ enunciado, alternativas, respostaCorreta, quiz: quizId });

            await novaQuestao.save();
            res.status(201).json({ message: 'Questão criada com sucesso!', questao: novaQuestao });
            
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar questão.', error });
        }
    }

    static async getQuestoes(req, res) {
        try {
            const questoes = await Questao.find().populate('quiz');
            res.status(200).json(questoes);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar questões.', error });
        }
    }

}