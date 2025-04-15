const mongoose = require('mongoose');
const estatiticas = new mongoose.Schema({
    questoes_feitas:{type: Number,default: 0},
    acertos:{type: Number, default: 0},
    erros:{type: Number, default: 0},
    quizzes_feitos:{type: Number, default: 0},
})
const UserSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    image:{type: String},
    role:{type: String ,enum: ['user', 'admin'], required: true},
    estatiticas:{type: estatiticas, default:()=>({})},
    pontos:{type: Number, default: 0},
    patente:{type:String, default: 'Aprediz Curioso'},
    quizzes_respondidos: [{
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
        data: { type: Date, default: Date.now },
        acertos: { type: Number, default: 0 },
        total_questoes: { type: Number, default: 0 }
    }],
},{timestamps: true});

module.exports = mongoose.model('User', UserSchema);

