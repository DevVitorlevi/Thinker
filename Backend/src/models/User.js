const mongoose = require('mongoose');

const EstatisticasSchema = new mongoose.Schema({
    questoes_feitas: { type: Number, default: 0 },
    acertos: { type: Number, default: 0 },
    quizzes_completos: { type: Number, default: 0 },
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    pontos: { type: Number, default: 0 }, // Pontos acumulados
    patente: { 
        type: String, 
        enum: [
            'Aprendiz do Conhecimento',
            'Decifrador de Desafios',
            'Mestre dos Quizzes',
            'Gênio da Mente Dourada',
            '🧠 O THINKER'
        ],
        default: 'Aprendiz do Conhecimento'
    },
    estatisticas: { type: EstatisticasSchema, default: () => ({}) },
    quizzes_respondidos: [{
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
        data: { type: Date, default: Date.now },
        acertos: { type: Number, default: 0 },
        total_questoes: { type: Number, default: 0 },
        pontos_ganhos: { type: Number, default: 0 } // Pontos ganhos naquele quiz
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);