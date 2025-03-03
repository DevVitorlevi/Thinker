const mongoose = require('mongoose');

const CriterioSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['questoes_feitas', 'acertos', 'quizzes_completos'],
        required: true
    },
    valorAlvo: { type: Number, required: true },
    comparador: {
        type: String,
        enum: ['igual', 'maior', 'menor', 'maior_igual', 'menor_igual'],
        default: 'maior_igual'
    }
});

const ConquistaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    criterios: [CriterioSchema],
    usuarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array de usuários que desbloquearam a conquista
    ativa: { type: Boolean, default: true },
    oculta: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Conquista', ConquistaSchema);