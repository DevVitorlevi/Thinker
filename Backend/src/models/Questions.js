const mongoose = require('mongoose');

const Questao = new mongoose.Schema({
    pergunta: { type: String, required: true },
    alternativas: [{ type: String, required: true }],
    respostaCorreta: { type: String, required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    dificuldade: { type: String, enum: ['facil', 'medio', 'dificil'] },
    respondida_por: [{ 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        acertou: { type: Boolean, default: false },
        data: { type: Date, default: Date.now } 
    }]
}, { timestamps: true });

module.exports = mongoose.model('Questao', Questao);