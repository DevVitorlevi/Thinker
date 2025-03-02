const Conquista = require('../models/Conquistas');

module.exports = class ConquistaController {
    static async create(req, res) {
        try {
            const { titulo, descricao, xp } = req.body;
            const userId = req.user.id; // Pega o ID do usuário autenticado

            if (!titulo || !descricao || !xp) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }

            const novaConquista = new Conquista({ titulo, descricao, xp, user: userId });
            await novaConquista.save();

            res.status(201).json({ message: 'Conquista criada com sucesso!', conquista: novaConquista });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar conquista.', error });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { titulo, descricao, xp } = req.body;
            const userId = req.user.id;

            const conquista = await Conquista.findOne({ _id: id, user: userId });

            if (!conquista) {
                return res.status(404).json({ message: 'Conquista não encontrada ou não pertence a você.' });
            }

            conquista.titulo = titulo || conquista.titulo;
            conquista.descricao = descricao || conquista.descricao;
            conquista.xp = xp || conquista.xp;

            await conquista.save();

            res.status(200).json({ message: 'Conquista atualizada com sucesso!', conquista });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar conquista.', error });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const conquista = await Conquista.findOneAndDelete({ _id: id, user: userId });

            if (!conquista) {
                return res.status(404).json({ message: 'Conquista não encontrada ou não pertence a você.' });
            }

            res.status(200).json({ message: 'Conquista deletada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar conquista.', error });
        }
    }
};
