const mongoose = require('mongoose');
const { Schema } = mongoose;

const Questao = new Schema({
    enunciado: { type: String, required: true },
    alternativa_a: { type: String, required: true },
    alternativa_b: { type: String, required: true },
    alternativa_c: { type: String, required: true },
    alternativa_d: { type: String, required: true },
    alternativa_correta: { type: String, required: true } // 'A', 'B', 'C' ou 'D'
}, { timestamps: true });

module.exports = mongoose.model('Questao', Questao);
