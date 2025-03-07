const mongoose = require('mongoose');

const EstatsticasSchema = new mongoose.Schema({
    questoes_feitas: { type: Number, default: 0 },
    acertos: { type: Number, default: 0 },
    quizzes_completos: { type: Number, default: 0 },
});

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Define se é admin ou usuário normal
    estatisticas: { type: EstatsticasSchema, default: () => ({}) },
    quizzes_respondidos: [{
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
        data: { type: Date, default: Date.now },
        acertos: { type: Number, default: 0 },
        total_questoes: { type: Number, default: 0 },
        pontos_obtidos: { type: Number, default: 0 } // Pontos obtidos no quiz
    }],
    respostas_temporarias: [{
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }, // ID do quiz
        questao: { type: mongoose.Schema.Types.ObjectId, ref: 'Questao' }, // ID da questão
        acertou: { type: Boolean, default: false } // Indica se o usuário acertou a questão
    }],
    pontos: { type: Number, default: 0 }, // Pontos do usuário
    ranking: { type: String, default: 'Aprendiz Curioso' } // Ranking atual do usuário
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);