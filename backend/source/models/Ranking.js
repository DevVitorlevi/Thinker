const mongoose = require('mongoose');

const RankingSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true }, // Nome do ranking (ex: "Aprendiz Curioso")
    pontosNecessarios: { type: Number, required: true } // Pontos necessários para alcançar este ranking
}, { timestamps: true });

module.exports = mongoose.model('Ranking', RankingSchema);