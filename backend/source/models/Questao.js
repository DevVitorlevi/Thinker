const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestaoSchema = new Schema({
    pergunta: { type: String, required: true },
    alternativas: [{
        texto: { type: String, required: true },
        correta: { type: Boolean, required: true }
    }],
    explicacao: { type: String }, // Explicação da resposta correta
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Questao', QuestaoSchema);
