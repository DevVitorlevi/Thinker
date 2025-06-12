const Materia = require('../models/Materias');

module.exports = class MateriaController {
    // Criar uma nova matéria
    static async create(req, res) {
        try {
            const { nome, descricao } = req.body;

            if (!nome || !descricao) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }

            const novaMateria = new Materia({ nome, descricao });
            await novaMateria.save();

            res.status(201).json({ message: 'Matéria criada com sucesso!', materia: novaMateria });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar matéria.', error });
        }
    }

    // Atualizar uma matéria existente
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao } = req.body;

            const materiaAtualizada = await Materia.findByIdAndUpdate(
                id,
                { nome, descricao },
                { new: true }
            );

            if (!materiaAtualizada) {
                return res.status(404).json({ message: 'Matéria não encontrada.' });
            }

            res.status(200).json({ message: 'Matéria atualizada com sucesso!', materia: materiaAtualizada });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar matéria.', error });
        }
    }

    // Deletar uma matéria
    static async delete(req, res) {
        try {
            const { id } = req.params;

            const materia = await Materia.findByIdAndDelete(id);

            if (!materia) {
                return res.status(404).json({ message: 'Matéria não encontrada.' });
            }

            res.status(200).json({ message: 'Matéria deletada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar matéria.', error });
        }
    }

    static async getAll(req, res) {
    try {
        // Popula os quizzes associados a cada matéria
        const materias = await Materia.find()
            .populate({
                path: 'quizzes',
                select: 'titulo tempo_estimado',
                options: { sort: { createdAt: -1 } } // Ordena do mais novo para o mais antigo
            })
            .sort({ nome: 1 }); // Ordena por nome A-Z

        res.status(200).json({
            message: 'Matérias recuperadas com sucesso!',
            count: materias.length,
            materias
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao buscar matérias.',
            error: error.message 
        });
    }
}
};