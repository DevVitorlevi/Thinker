const Quiz = require('../models/Quizes');
const User = require('../models/User');
const Materia = require('../models/Materias');
const Ranking = require('../models/Ranking')

module.exports = class QuizController {
    // Criar um novo quiz
    static async create(req, res) {
        try {
            const { titulo, materiaId } = req.body;

            if (!titulo || !materiaId) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Cria o novo quiz
            const novoQuiz = new Quiz({ titulo, materia: materiaId });
            await novoQuiz.save();

            // Atualiza o array `quizzes` da Matéria correspondente
            const materia = await Materia.findById(materiaId);
            if (materia) {
                materia.quizzes.push(novoQuiz._id); // Adiciona o ID do quiz ao array
                await materia.save(); // Salva a atualização da Matéria
            }

            res.status(201).json({ message: 'Quiz criado com sucesso!', quiz: novoQuiz });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar quiz.', error });
        }
    }

    // Atualizar um quiz existente
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { titulo, questoes, materiaId,tempo_estimado } = req.body;

            const quizAtualizado = await Quiz.findByIdAndUpdate(
                id,
                { titulo, questoes, materia: materiaId,tempo_estimado },
                { new: true }
            );

            if (!quizAtualizado) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }

            res.status(200).json({ message: 'Quiz atualizado com sucesso!', quiz: quizAtualizado });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar quiz.', error });
        }
    }

    // Deletar um quiz
    static async delete(req, res) {
        try {
            const { id } = req.params;

            // Busca o quiz no banco de dados
            const quiz = await Quiz.findById(id);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }

            // Remove o ID do quiz do array `quizzes` da Matéria correspondente
            const materia = await Materia.findById(quiz.materia);
            if (materia) {
                // Verifica se o ID do quiz está no array `quizzes`
                const index = materia.quizzes.indexOf(quiz._id);
                if (index !== -1) {
                    materia.quizzes.pull(quiz._id); // Remove o ID do quiz do array
                    await materia.save(); // Salva a atualização da Matéria
                    console.log(`Quiz ${quiz._id} removido da Matéria ${materia._id}.`);
                } else {
                    console.log(`Quiz ${quiz._id} não encontrado no array quizzes da Matéria ${materia._id}.`);
                }
            } else {
                console.log(`Matéria ${quiz.materia} não encontrada.`);
            }

            // Deleta o quiz do banco de dados
            await Quiz.findByIdAndDelete(id);

            res.status(200).json({ message: 'Quiz deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar quiz:', error);
            res.status(500).json({ message: 'Erro ao deletar quiz.', error });
        }
    }

    // Completar um quiz
    static async completarQuiz(req, res) {
        try {
            const { quizId } = req.body;
            const userId = req.user.id; // ID do usuário autenticado
    
            console.log(`Completando quiz ${quizId} para o usuário ${userId}`);
    
            // Busca o quiz no banco de dados e popula as questões
            const quiz = await Quiz.findById(quizId).populate('questoes');
            if (!quiz) {
                console.log('Quiz não encontrado.');
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }
    
            console.log(`Quiz encontrado: ${quiz.titulo}`);
    
            // Busca o usuário no banco de dados
            const user = await User.findById(userId);
            if (!user) {
                console.log('Usuário não encontrado.');
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
    
            console.log(`Usuário encontrado: ${user.nome}`);
    
            // Filtra as respostas temporárias do usuário para o quiz atual
            const respostasQuiz = user.respostas_temporarias.filter(resposta => resposta.quiz.toString() === quizId);
    
            // Calcula a pontuação do usuário
            let pontosObtidos = 0;
            for (const resposta of respostasQuiz) {
                const questao = quiz.questoes.find(q => q._id.toString() === resposta.questao.toString());
                if (questao && resposta.acertou) {
                    console.log(`Usuário acertou a questão: ${questao.pergunta}`);
                    switch (questao.dificuldade) {
                        case 'facil':
                            pontosObtidos += 5;
                            break;
                        case 'medio':
                            pontosObtidos += 10;
                            break;
                        case 'dificil':
                            pontosObtidos += 15;
                            break;
                    }
                } else {
                    console.log(`Usuário não acertou a questão: ${questao.pergunta}`);
                }
            }
    
            console.log(`Pontos obtidos nas questões: ${pontosObtidos}`);
    
            // Adiciona 50 pontos por completar o quiz
            pontosObtidos += 50;
            console.log(`Pontos totais (com bônus de completar quiz): ${pontosObtidos}`);
    
            // Atualiza as estatísticas do usuário
            user.estatisticas.quizzes_completos += 1;
            user.estatisticas.acertos += respostasQuiz.filter(resposta => resposta.acertou).length;
            user.estatisticas.questoes_feitas += quiz.questoes.length;
            user.pontos += pontosObtidos;
    
            // Verifica e atualiza o ranking do usuário
            const rankings = await Ranking.find().sort({ pontosNecessarios: 1 }); // Busca rankings ordenados por pontos necessários
            for (const ranking of rankings) {
                if (user.pontos >= ranking.pontosNecessarios) {
                    user.ranking = ranking.nome;
                }
            }
    
            // Adiciona o quiz completado ao array de quizzes respondidos do usuário
            user.quizzes_respondidos.push({
                quiz: quizId,
                data: new Date(),
                acertos: respostasQuiz.filter(resposta => resposta.acertou).length,
                total_questoes: quiz.questoes.length,
                pontos_obtidos: pontosObtidos
            });
    
            // Remove as respostas temporárias do quiz atual
            user.respostas_temporarias = user.respostas_temporarias.filter(resposta => resposta.quiz.toString() !== quizId);
    
            // Salva as atualizações do usuário
            await user.save();
    
            res.status(200).json({
                message: 'Quiz completado com sucesso!',
                estatisticas: user.estatisticas,
                pontos: user.pontos,
                ranking: user.ranking,
                pontos_obtidos: pontosObtidos
            });
        } catch (error) {
            console.error('Erro ao completar quiz:', error); // Adicione um log para depuração
            res.status(500).json({ message: 'Erro ao completar quiz.', error });
        }
    }
};