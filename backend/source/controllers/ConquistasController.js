const Conquista = require('../models/Conquistas')
const User = require('../models/User')

module.export = class ConquistaController {
    static async createConquista(req, res) {
        try {
            const { titulo, descricao, userId } = req.body;
            if (!titulo || !descricao || !userId) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            const novaConquista = new Conquista({ titulo, descricao, user: userId });
            await novaConquista.save();
            res.status(201).json({ message: 'Conquista criada com sucesso!', conquista: novaConquista });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar conquista.', error });
        }
    }

    static async getConquistas(req, res) {
        try {
            const conquistas = await Conquista.find().populate('user');
            res.status(200).json(conquistas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar conquistas.', error });
        }
    }
}