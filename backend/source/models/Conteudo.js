const mongoose = require('mongoose')

const Conteudo = new mongoose.Schema({
titulo: { type: String, required: true },
conceitos: { type: String, required: true },
imagem: { type: String, required: true },
materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia' },
}, { timestamps: true });

module.exports = mongoose.model('Conteudo', Conteudo);