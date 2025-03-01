const mongoose = require('mongoose');


const Questao = new mongoose.Schema({
    pergunta: { type: String, required: true },
    alternativas: [{ type: String, required: true }],
    respostaCorreta: { type: String, required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }
}, { timestamps: true });

module.exports = mongoose.model('Questao', Questao);
