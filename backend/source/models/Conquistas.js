const mongoose = require('mongoose');

const Conquista = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    usuarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Conquista', Conquista);
