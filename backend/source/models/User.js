const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    image:{type:String},
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Define se é admin ou usuário normal
    conquistas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conquista' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
