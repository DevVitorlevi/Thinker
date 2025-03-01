const mongoose = require('mongoose');
const { Schema } = mongoose;

const Materia = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
    conteudos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conteudo' }]
}, { timestamps: true });

module.exports = mongoose.model('Materia', Materia);
