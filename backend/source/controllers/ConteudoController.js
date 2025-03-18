// controllers/ConteudoController.js
const Conteudo = require('../models/Conteudo');

module.exports = class ConteudoController {
    // Criar um novo conteúdo
    static async create(req, res) {
        try {
            const { titulo, conceitos, imagem, materia } = req.body;

            if (!titulo || !conceitos || !imagem || !materia) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }

            const novoConteudo = new Conteudo({ titulo, conceitos, imagem, materia });
            await novoConteudo.save();

            res.status(201).json({ message: 'Conteúdo criado com sucesso!', conteudo: novoConteudo });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar conteúdo.', error });
        }
    }

    // Obter todos os conteúdos
    static async getAll(req, res) {
        try {
            const conteudos = await Conteudo.find().populate('materia'); // Popula a matéria associada
            res.status(200).json({ conteudos });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter conteúdos.', error });
        }
    }

    // Obter um conteúdo por ID
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const conteudo = await Conteudo.findById(id).populate('materia'); // Popula a matéria associada

            if (!conteudo) {
                return res.status(404).json({ message: 'Conteúdo não encontrado.' });
            }

            res.status(200).json({ conteudo });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter conteúdo.', error });
        }
    }

    // Atualizar um conteúdo
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { titulo, conceitos, imagem, materia } = req.body;

            const conteudoAtualizado = await Conteudo.findByIdAndUpdate(
                id,
                { titulo, conceitos, imagem, materia },
                { new: true } // Retorna o conteúdo atualizado
            ).populate('materia'); // Popula a matéria associada

            if (!conteudoAtualizado) {
                return res.status(404).json({ message: 'Conteúdo não encontrado.' });
            }

            res.status(200).json({ message: 'Conteúdo atualizado com sucesso!', conteudo: conteudoAtualizado });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar conteúdo.', error });
        }
    }

    // Deletar um conteúdo
    static async delete(req, res) {
        try {
            const { id } = req.params;

            const conteudo = await Conteudo.findByIdAndDelete(id);

            if (!conteudo) {
                return res.status(404).json({ message: 'Conteúdo não encontrado.' });
            }

            res.status(200).json({ message: 'Conteúdo deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar conteúdo.', error });
        }
    }
};