const mongoose = require('mongoose');
const { Schema } = mongoose;

const Materia = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
}, { timestamps: true });

module.exports = mongoose.model('Materia', Materia);