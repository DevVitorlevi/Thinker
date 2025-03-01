const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizSchema = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia', required: true },
    questoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Questao' }],
    xpGanho: { type: Number, default: 10 } // XP ganho ao completar o quiz
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
