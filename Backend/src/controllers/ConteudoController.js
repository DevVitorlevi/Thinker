const Conteudo = require('../models/Conteudo');
const Materia = require('../models/Materias');

module.exports = class ConteudoController {
    // Criar conteúdo (admin)
    static async create(req, res) {
        const { titulo, conceitos, materiaId } = req.body;

        if (!titulo || !conceitos || !materiaId) {
            return res.status(422).json({ message: 'Título, conceitos e matéria são obrigatórios.' });
        }

        try {
            const materia = await Materia.findById(materiaId);
            if (!materia) {
                return res.status(404).json({ message: 'Matéria não encontrada.' });
            }

            const novoConteudo = new Conteudo({
                titulo,
                conceitos: JSON.parse(conceitos), // Converte string JSON para array
                materia: materiaId
            });

            await novoConteudo.save();
            res.status(201).json({ 
                message: 'Conteúdo criado com sucesso!',
                conteudo: novoConteudo
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar conteúdo.', error });
        }
    }

    // Atualizar conteúdo (admin)
    static async update(req, res) {
        const { id } = req.params;
        const { titulo, conceitos } = req.body;

        try {
            const conteudo = await Conteudo.findById(id);
            if (!conteudo) {
                return res.status(404).json({ message: 'Conteúdo não encontrado.' });
            }

            if (titulo) conteudo.titulo = titulo;
            if (conceitos) conteudo.conceitos = JSON.parse(conceitos);

            await conteudo.save();
            res.status(200).json({ 
                message: 'Conteúdo atualizado!',
                conteudo
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar.', error });
        }
    }

    // Deletar conteúdo (admin)
    static async delete(req, res) {
        const { id } = req.params;

        try {
            const conteudo = await Conteudo.findByIdAndDelete(id);
            if (!conteudo) {
                return res.status(404).json({ message: 'Conteúdo não encontrado.' });
            }

            res.status(200).json({ message: 'Conteúdo removido com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar.', error });
        }
    }

    // Listar conteúdos por matéria (user)
    static async getByMateria(req, res) {
        const { materiaId } = req.params;

        try {
            const conteudos = await Conteudo.find({ materia: materiaId })
                .select('-conceitos.imagens') // Não retorna imagens na listagem
                .sort({ createdAt: -1 });

            res.status(200).json({ conteudos });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar conteúdos.', error });
        }
    }

    // Obter conteúdo completo (user)
    static async getById(req, res) {
        const { id } = req.params;

        try {
            const conteudo = await Conteudo.findById(id)
                .populate('materia', 'nome');

            if (!conteudo) {
                return res.status(404).json({ message: 'Conteúdo não encontrado.' });
            }

            res.status(200).json({ conteudo });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar conteúdo.', error });
        }
    }
};