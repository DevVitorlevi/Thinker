const Ranking = require('../models/Ranking');

module.exports = class RankingController {
    static async createRanking(req, res) {
        try {
            const { nome, pontosNecessarios } = req.body;
            if (!nome || !pontosNecessarios) return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });

            const rankingExistente = await Ranking.findOne({ nome });
            if (rankingExistente) return res.status(422).json({ message: 'Este ranking já existe.' });

            const novoRanking = new Ranking({ nome, pontosNecessarios });
            await novoRanking.save();

            res.status(201).json({ message: 'Ranking criado com sucesso!', ranking: novoRanking });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar ranking.', error });
        }
    }

    static async getRankings(req, res) {
        try {
            const rankings = await Ranking.find().sort({ pontosNecessarios: 1 });
            res.status(200).json({ rankings });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter rankings.', error });
        }
    }

    static async getUserRanking(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

            res.status(200).json({ ranking: user.ranking, pontos: user.pontos });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter ranking do usuário.', error });
        }
    }
};