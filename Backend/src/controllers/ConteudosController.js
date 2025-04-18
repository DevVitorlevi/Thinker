const Conteudo = require('../models/Conteudo');

module.exports = class ConteudoController {
    static async create(req, res) {
        try {
            const { titulo, conceitos, materia } = req.body;

            if (!titulo || !conceitos || !materia || !req.files || req.files.length === 0) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios, incluindo as imagens.' });
            }

            const imagens = req.files.map(file => `/images/conteudos/${file.filename}`);
            const novoConteudo = new Conteudo({ titulo, conceitos, imagens, materia });
            await novoConteudo.save();

            res.status(201).json({ message: 'Conteúdo criado com sucesso!', conteudo: novoConteudo });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar conteúdo.', error });
        }
    }

    static async getAll(req, res) {
        try {
            const conteudos = await Conteudo.find().populate('materia');
            res.status(200).json({ conteudos });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter conteúdos.', error });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const conteudo = await Conteudo.findById(id).populate('materia');
            if (!conteudo) return res.status(404).json({ message: 'Conteúdo não encontrado.' });
            res.status(200).json({ conteudo });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter conteúdo.', error });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { titulo, conceitos, materia } = req.body;

            const conteudo = await Conteudo.findById(id);
            if (!conteudo) return res.status(404).json({ message: 'Conteúdo não encontrado.' });

            conteudo.titulo = titulo || conteudo.titulo;
            conteudo.conceitos = conceitos || conteudo.conceitos;
            conteudo.materia = materia || conteudo.materia;

            if (req.files && req.files.length > 0) {
                const novasImagens = req.files.map(file => `/images/conteudos/${file.filename}`);
                conteudo.imagens = [...conteudo.imagens, ...novasImagens];
            }

            await conteudo.save();
            res.status(200).json({ message: 'Conteúdo atualizado com sucesso!', conteudo });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar conteúdo.', error });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const conteudo = await Conteudo.findByIdAndDelete(id);
            if (!conteudo) return res.status(404).json({ message: 'Conteúdo não encontrado.' });
            res.status(200).json({ message: 'Conteúdo deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar conteúdo.', error });
        }
    }
};