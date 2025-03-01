const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConteudoSchema = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia', required: true },
    texto: { type: String },
    imagensExplicativas: [{ type: String }] // Lista de URLs para imagens explicativas
}, { timestamps: true });

module.exports = mongoose.model('Conteudo', ConteudoSchema);
