// models/Conteudo.js
const mongoose = require('mongoose');

const ConteudoSchema = new mongoose.Schema({
    titulo: { type: String, required: true }, // Título do conteúdo
    conceitos: { type: String, required: true }, // Descrição ou lista de conceitos
    imagens: [{ type: String }], // Array de URLs ou caminhos das imagens
    materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia', required: true } // Referência à matéria
}, { timestamps: true });

module.exports = mongoose.model('Conteudo', ConteudoSchema);