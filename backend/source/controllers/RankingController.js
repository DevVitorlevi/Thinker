const Ranking = require('../models/Ranking');
const User = require('../models/Ranking')
module.exports = class RankingController {
    // Criar um novo ranking (apenas admin)
    static async createRanking(req, res) {
        try {
            const { nome, pontosNecessarios } = req.body;

            if (!nome || !pontosNecessarios) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Verifica se o ranking já existe
            const rankingExistente = await Ranking.findOne({ nome });
            if (rankingExistente) {
                return res.status(422).json({ message: 'Este ranking já existe.' });
            }

            // Cria o novo ranking
            const novoRanking = new Ranking({ nome, pontosNecessarios });
            await novoRanking.save();

            res.status(201).json({ message: 'Ranking criado com sucesso!', ranking: novoRanking });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar ranking.', error });
        }
    }

    // Atualizar um ranking existente (apenas admin)
    static async updateRanking(req, res) {
        try {
            const { id } = req.params;
            const { nome, pontosNecessarios } = req.body;

            if (!nome || !pontosNecessarios) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Verifica se o ranking existe
            const ranking = await Ranking.findById(id);
            if (!ranking) {
                return res.status(404).json({ message: 'Ranking não encontrado.' });
            }

            // Atualiza o ranking
            ranking.nome = nome;
            ranking.pontosNecessarios = pontosNecessarios;
            await ranking.save();

            res.status(200).json({ message: 'Ranking atualizado com sucesso!', ranking });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar ranking.', error });
        }
    }

    // Deletar um ranking (apenas admin)
    static async deleteRanking(req, res) {
        try {
            const { id } = req.params;

            // Verifica se o ranking existe
            const ranking = await Ranking.findById(id);
            if (!ranking) {
                return res.status(404).json({ message: 'Ranking não encontrado.' });
            }

            // Deleta o ranking
            await Ranking.findByIdAndDelete(id);

            res.status(200).json({ message: 'Ranking deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar ranking.', error });
        }
    }

    // Obter todos os rankings (disponível para todos)
    static async getRankings(req, res) {
        try {
            const rankings = await Ranking.find().sort({ pontosNecessarios: 1 });
            res.status(200).json({ rankings });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter rankings.', error });
        }
    }

    // Obter o ranking atual do usuário (disponível para todos)
    static async getUserRanking(req, res) {
        try {
            const userId = req.user.id; // ID do usuário autenticado
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            res.status(200).json({ ranking: user.ranking, pontos: user.pontos });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter ranking do usuário.', error });
        }
    }
};