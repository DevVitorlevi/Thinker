const User = require('../models/User');

// Configuração das patentes
const PATENTES = [
    { nome: 'Iniciante', pontos: 0 },
    { nome: 'Aprendiz', pontos: 200 },
    { nome: 'Intermediário', pontos: 500 },
    { nome: 'Avançado', pontos: 1000 },
    { nome: 'Expert', pontos: 2000 },
    { nome: 'Mestre', pontos: 3500 }
];

module.exports = class RankingController {
    // Atualizar pontos e ranking do usuário
    static async atualizarPontuacao(userId, pontos) {
        try {
            const user = await User.findById(userId);
            if (!user) return null;

            // Atualiza pontos (garante que não ultrapasse 200 por quiz)
            user.estatisticas.pontos = Math.max(user.estatisticas.pontos, pontos);

            // Verifica promoção de patente
            let patenteAtual = PATENTES[0];
            let proximaPatente = PATENTES[1];

            for (let i = PATENTES.length - 1; i >= 0; i--) {
                if (user.estatisticas.pontos >= PATENTES[i].pontos) {
                    patenteAtual = PATENTES[i];
                    proximaPatente = PATENTES[i + 1] || PATENTES[i];
                    break;
                }
            }

            // Calcula progresso para próxima patente
            const progresso = proximaPatente 
                ? Math.min(100, Math.round((user.estatisticas.pontos - patenteAtual.pontos) / 
                          (proximaPatente.pontos - patenteAtual.pontos) * 100))
                : 100;

            // Atualiza ranking
            user.estatisticas.ranking = {
                patente: patenteAtual.nome,
                progresso
            };

            await user.save();
            return user;
        } catch (error) {
            console.error('Erro ao atualizar pontuação:', error);
            return null;
        }
    }

    // Obter ranking do usuário
    static async getRanking(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId)
                .select('estatisticas.pontos estatisticas.ranking');

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            res.status(200).json({
                pontos: user.estatisticas.pontos,
                ranking: user.estatisticas.ranking,
                patentes: PATENTES
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar ranking.', error });
        }
    }

    // Obter todos os rankings (para leaderboard futuro)
    static async getAllRankings(req, res) {
        try {
            const users = await User.find({ role: 'user' })
                .select('nome image estatisticas.pontos estatisticas.ranking')
                .sort({ 'estatisticas.pontos': -1 });

            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar rankings.', error });
        }
    }
};