

const Questao = require('../models/Questions');
const User = require('../models/User');
const Quiz = require('../models/Quiz')

module.exports = class QuestaoController {
    // Criar uma nova questão
    static async create(req, res) {
        try {
            const { pergunta, alternativas, respostaCorreta, quizId,dificuldade } = req.body;

            if (!pergunta || !alternativas || !respostaCorreta || !quizId) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }

            const novaQuestao = new Questao({ pergunta, alternativas, respostaCorreta, quiz: quizId,dificuldade });

            await novaQuestao.save();

            // Atualiza o array de questões no Quiz correspondente
            const quiz = await Quiz.findById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }

            quiz.questoes.push(novaQuestao._id); // Adiciona o ID da nova questão ao array
            await quiz.save(); // Salva a atualização do Quiz

            res.status(201).json({ message: 'Questão criada com sucesso!', questao: novaQuestao });

        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar questão.', error });
        }
    }

    // Atualizar uma questão existente
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { pergunta, alternativas, respostaCorreta, dificuldade } = req.body;

            const questaoAtualizada = await Questao.findByIdAndUpdate(
                id,
                { pergunta, alternativas, respostaCorreta,dificuldade },
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

            // Busca a questão no banco de dados
            const questao = await Questao.findById(id);
            if (!questao) {
                return res.status(404).json({ message: 'Questão não encontrada.' });
            }

            // Remove o ID da questão do array `questoes` do Quiz correspondente
            const quiz = await Quiz.findById(questao.quiz);
            if (quiz) {
                quiz.questoes.pull(id); // Remove o ID da questão do array
                await quiz.save(); // Salva a atualização do Quiz
            }

            // Deleta a questão do banco de dados
            await Questao.findByIdAndDelete(id);

            res.status(200).json({ message: 'Questão deletada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar questão.', error });
        }
    }
    // Responder uma questão
    static async responderQuestao(req, res) {
        try {
            const { questaoId, acertou } = req.body;
            const userId = req.user.id; // ID do usuário autenticado

            // Busca a questão no banco de dados
            const questao = await Questao.findById(questaoId);
            if (!questao) {
                return res.status(404).json({ message: 'Questão não encontrada.' });
            }

            // Busca o usuário no banco de dados
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            // Atualiza as estatísticas do usuário
            user.estatisticas.questoes_feitas += 1;
            if (acertou) {
                user.estatisticas.acertos += 1;
            }

            // Salva as atualizações do usuário
            await user.save();


            res.status(200).json({ message: 'Questão respondida com sucesso!', estatisticas: user.estatisticas });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao responder questão.', error });
        }
    }
};