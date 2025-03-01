
const Materias = require('../models/Materias')
const Quiz = require('../models/Quizes')
module.exports = class MateriasController {

    static async createMateria(req, res) {
        try {
            const { nome, descricao, quizId } = req.body;
            if (!nome || !descricao || !quizId) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }
            const quiz = await Quiz.findById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz não encontrado.' });
            }
            const novaMateria = new Materias({ nome, descricao, quiz: quizId });
            await novaMateria.save();
            res.status(201).json({ message: 'Matéria criada com sucesso!', materia: novaMateria });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar matéria.', error });
        }
    }
    static async getMaterias(req, res) {
        try {
            const materias = await Materias.find().populate('quiz');
            res.status(200).json(materias);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar matérias.', error });
        }
    }

}