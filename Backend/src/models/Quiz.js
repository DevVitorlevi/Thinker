const mongoose = require('mongoose');

const Quiz = new mongoose.Schema({
    titulo: { type: String, required: true },
    materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia' },
    questoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Questao' }],
    completado_por: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        data: { type: Date, default: Date.now },
        acertos: { type: Number, default: 0 },
        total_questoes: { type: Number, default: 0 }
    }],
    tempo_estimado: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', Quiz);
