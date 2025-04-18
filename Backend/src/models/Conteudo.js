const mongoose = require('mongoose');

const ConteudoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    conceitos: { type: String, required: true },
    imagens: [{ type: String }], // Array de URLs das imagens
    materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Conteudo', ConteudoSchema);