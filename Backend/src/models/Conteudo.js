const mongoose = require('mongoose');

const ConteudoSchema = new mongoose.Schema({
    titulo: { 
        type: String, 
        required: true 
    },
    conceitos: [{ 
        titulo: { type: String, required: true },
        descricao: { type: String, required: true },
        imagens: [{ type: String }]  // URLs das imagens
    }],
    materia: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Materia', 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Conteudo', ConteudoSchema);