const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Evita duplicação de e-mails no banco de dados
    },
    image: {
        type: String
    },
    telefone: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true    
    },
    xp: { 
        type: Number, 
        default: 0 
    },
    conquistas: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Conquista' 
    }]
}, 
{ timestamps: true });

module.exports = mongoose.model('User', UserSchema);
