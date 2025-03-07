const mongoose = require('mongoose');

const Questao = new mongoose.Schema({
    pergunta: { type: String, required: true },
    alternativas: [{ type: String, required: true }],
    respostaCorreta: { type: String, required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    dificuldade: { type: String, enum: ['facil', 'medio', 'dificil'], default: 'medio' },
    respondida_por: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ID do usuário que respondeu
        acertou: { type: Boolean, default: false }, // Indica se o usuário acertou a questão
        data: { type: Date, default: Date.now } // Data da resposta
    }]
}, { timestamps: true });

module.exports = mongoose.model('Questao', Questao);    