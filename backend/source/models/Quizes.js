const mongoose = require('mongoose');

const Quiz = new mongoose.Schema({
    titulo: { type: String, required: true },
    materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia' },
    questoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Questao' }],
    tempo_estimado: { type: Number, default: 0 } // Tempo estimado em minutos para conclusão
}, { timestamps: true });

module.exports = mongoose.model('Quiz', Quiz);