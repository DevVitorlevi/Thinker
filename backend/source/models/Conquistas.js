const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConquistaSchema = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    criterio: { type: String, required: true } // Exemplo: 'Completar 10 quizzes'
}, { timestamps: true });

module.exports = mongoose.model('Conquista', ConquistaSchema);
