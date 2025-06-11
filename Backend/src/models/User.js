const mongoose = require('mongoose');

const EstatsticasSchema = new mongoose.Schema({
    questoes_feitas: { type: Number, default: 0 },
    acertos: { type: Number, default: 0 },
    quizzes_completos: { type: Number, default: 0 },
    pontos: { type: Number, default: 0 }, // Adicionado campo de pontos
    patente: { type: String, default: 'Aprendiz do Conhecimento' } // Adicionado campo de patente
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    estatisticas: { type: EstatsticasSchema, default: () => ({}) },
    quizzes_respondidos: [{
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
        data: { type: Date, default: Date.now },
        acertos: { type: Number, default: 0 },
        total_questoes: { type: Number, default: 0 },
        pontos_ganhos: { type: Number, default: 0 } // Adicionado pontos ganhos por quiz
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);