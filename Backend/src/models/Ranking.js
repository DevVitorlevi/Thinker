const mongoose = require('mongoose');

const RankingSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    pontosNecessarios: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Ranking', RankingSchema);