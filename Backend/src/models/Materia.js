const mongoose = require('mongoose');

const Materia = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
    conteudos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conteudo' }] // Relação com Conteúdos
}, { timestamps: true });

module.exports = mongoose.model('Materia', Materia);