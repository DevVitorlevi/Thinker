const mongoose = require('mongoose');

const CriterioSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['questoes_feitas', 'acertos', 'quizzes_completos', 'streak_diario', 'tempo_estudo'],
        required: true
    },
    valorAlvo: { type: Number, required: true },
    comparador: {
        type: String,
        enum: ['igual', 'maior', 'menor', 'maior_igual', 'menor_igual'],
        default: 'maior_igual'
    }
});

const Conquista = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    criterios: [CriterioSchema],
    usuarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    ativa: { type: Boolean, default: true }, // Indica se a conquista está disponível
    oculta: { type: Boolean, default: false } // Se true, a conquista não é visível até ser obtida
}, { timestamps: true });

module.exports = mongoose.model('Conquista', Conquista);
