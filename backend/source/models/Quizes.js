const mongoose = require('mongoose');
const { Schema } = mongoose;

const Quiz = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia', required: true }, // Referência para a matéria
    questoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Questao' }] // Lista de questões associadas ao quiz
}, { timestamps: true });

module.exports = mongoose.model('Quiz', Quiz);
