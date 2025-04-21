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
        trim: true,
        maxlength: [100, 'Nome não pode exceder 100 caracteres']
    },
    email: { 
        type: String, 
        required: [true, 'O email é obrigatório'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, insira um email válido']
    },
    senha: { 
        type: String, 
        required: [true, 'A senha é obrigatória'],
        minlength: [8, 'A senha deve ter no mínimo 8 caracteres'],
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
}, { 
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
});

// Middleware para hash da senha antes de salvar
UserSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) return next();
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para verificar senha
UserSchema.methods.verificarSenha = async function(senhaCandidata) {
    if (!senhaCandidata || !this.senha) return false;
    return await bcrypt.compare(String(senhaCandidata), this.senha);
};

// Método para atualizar último login
UserSchema.methods.atualizarUltimoLogin = async function() {
    this.ultimoLogin = new Date();
    return await this.save();
};

// Remove a senha ao converter para JSON
UserSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.senha;
    return user;
};

// Índices para melhor performance
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });

module.exports = mongoose.model('User', UserSchema);