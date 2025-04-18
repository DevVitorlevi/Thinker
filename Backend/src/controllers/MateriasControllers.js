const Materia = require('../models/Materia');

module.exports = class MateriaController {
    static async create(req, res) {
        try {
            const { nome, descricao } = req.body;
            if (!nome || !descricao) return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });

            const novaMateria = new Materia({ nome, descricao });
            await novaMateria.save();

            res.status(201).json({ message: 'Matéria criada com sucesso!', materia: novaMateria });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar matéria.', error });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao } = req.body;

            const materiaAtualizada = await Materia.findByIdAndUpdate(
                id,
                { nome, descricao },
                { new: true }
            );

            if (!materiaAtualizada) return res.status(404).json({ message: 'Matéria não encontrada.' });
            res.status(200).json({ message: 'Matéria atualizada com sucesso!', materia: materiaAtualizada });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar matéria.', error });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const materia = await Materia.findByIdAndDelete(id);
            if (!materia) return res.status(404).json({ message: 'Matéria não encontrada.' });
            res.status(200).json({ message: 'Matéria deletada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar matéria.', error });
        }
    }
};