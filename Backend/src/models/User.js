const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const EstatisticasSchema = new mongoose.Schema({
    questoes_feitas: { type: Number, default: 0 },
    acertos: { type: Number, default: 0 },
    quizzes_completos: { type: Number, default: 0 },
    pontos: { type: Number, default: 0 }
});

const UserSchema = new mongoose.Schema({
    nome: { 
        type: String, 
        required: [true, 'O nome é obrigatório'],
        trim: true
    },
    email: { 
        type: String, 
        required: [true, 'O email é obrigatório'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
    },
    senha: { 
        type: String, 
        required: [true, 'A senha é obrigatória'],
        minlength: [6, 'A senha deve ter no mínimo 6 caracteres'],
        select: false
    },
    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user',
        required: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    ultimoLogin: {
        type: Date
    },
    ativo: {
        type: Boolean,
        default: true
    },
    estatisticas: {
        type: EstatisticasSchema,
        default: () => ({})
    }
}, { versionKey: false });

// Criptografa senha antes de salvar
UserSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) return next();
    this.senha = await bcrypt.hash(this.senha, 12);
    next();
});

// Atualiza último login
UserSchema.methods.atualizarUltimoLogin = function() {
    this.ultimoLogin = new Date();
    return this.save();
};

// Verifica senha
UserSchema.methods.verificarSenha = async function(senhaCandidata) {
    return await bcrypt.compare(senhaCandidata, this.senha);
};

module.exports = mongoose.model('User', UserSchema);