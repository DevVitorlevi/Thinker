const mongoose = require('mongoose');

const EstatsticasSchema = new mongoose.Schema({
    questoes_feitas: { type: Number, default: 0 },
    acertos: { type: Number, default: 0 },
    quizzes_completos: { type: Number, default: 0 },
    tempo_estudo: { type: Number, default: 0 } // em minutos
});

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Define se é admin ou usuário normal
    conquistas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conquista' }],
    estatisticas: { type: EstatsticasSchema, default: () => ({}) },
    quizzes_respondidos: [{
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
        data: { type: Date, default: Date.now },
        acertos: { type: Number, default: 0 },
        total_questoes: { type: Number, default: 0 }
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);