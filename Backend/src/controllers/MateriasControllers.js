const Materia = require('../models/Materias');
const Quiz = require('../models/Quizes');

module.exports = class MateriaController {
    // Criar matéria
    static async create(req, res) {
        const { nome, descricao } = req.body;

        if (!nome) {
            return res.status(422).json({ message: 'O nome é obrigatório.' });
        }

        try {
            const materiaExist = await Materia.findOne({ nome });
            if (materiaExist) {
                return res.status(422).json({ message: 'Matéria já cadastrada.' });
            }

            const novaMateria = new Materia({ nome, descricao });
            await novaMateria.save();

            res.status(201).json({ 
                message: 'Matéria criada com sucesso!',
                materia: novaMateria 
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar matéria.', error });
        }
    }

    // Atualizar matéria
    static async update(req, res) {
        const { id } = req.params;
        const { nome, descricao } = req.body;

        try {
            const materia = await Materia.findById(id);
            if (!materia) {
                return res.status(404).json({ message: 'Matéria não encontrada.' });
            }

            if (nome) materia.nome = nome;
            if (descricao) materia.descricao = descricao;

            await materia.save();
            res.status(200).json({ 
                message: 'Matéria atualizada!',
                materia 
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar.', error });
        }
    }

    // Deletar matéria
    static async delete(req, res) {
        const { id } = req.params;

        try {
            const materia = await Materia.findById(id);
            if (!materia) {
                return res.status(404).json({ message: 'Matéria não encontrada.' });
            }

            // Verifica se há quizzes associados
            if (materia.quizzes.length > 0) {
                return res.status(400).json({ 
                    message: 'Existem quizzes vinculados a esta matéria.' 
                });
            }

            await Materia.findByIdAndDelete(id);
            res.status(200).json({ message: 'Matéria removida!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar.', error });
        }
    }

    // Listar todas matérias (novo método adicionado)
    static async getAll(req, res) {
        try {
            const materias = await Materia.find().populate('quizzes');
            res.status(200).json({ materias });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar matérias.', error });
        }
    }

    // Obter matéria por ID (novo método adicionado)
    static async getById(req, res) {
        const { id } = req.params;

        try {
            const materia = await Materia.findById(id).populate('quizzes');
            if (!materia) {
                return res.status(404).json({ message: 'Matéria não encontrada.' });
            }
            res.status(200).json({ materia });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar matéria.', error });
        }
    }
};