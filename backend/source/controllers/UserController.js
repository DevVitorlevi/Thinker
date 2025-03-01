const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const CreateUserToken = require('../helpers/Create-token')
const getToken = require("../helpers/get-token")
module.exports =  class UserController{

    static async register(req,res){
        const { nome, email,senha, confirmesenha } = req.body;
        
        if (!nome||!email||!senha || !confirmesenha){
            return res.status(422).json({message:'Todos os Campos São Obrigatórios'})
        }
        
        if (senha !== confirmesenha) {
            return res.status(422).json({ message: 'As senhas não coincidem.' });
        }

        try{
            const userExist = await User.findOne({email:email})

            if(userExist){
                return res.status(422).json({message:'Usuário Já Existe'})
            }

            const salt = await bcrypt.genSalt(12)

            const hashPass = await bcrypt.hash(senha,salt)

            const userData = new User ({
                nome,
                email,
                senha:hashPass
            })

            const userSave = await userData.save()
            await CreateUserToken(userSave,req,res)
        }
        catch(err){
                console.error(err);
                return res.status(500).json({ message: 'Ocorreu um erro no servidor.', erro: err.message });
        }
    }
    
    static async login(req,res){
        const {email,senha} = req.body

        if(!email || !senha){
            return res.status(422).json({message:'Todos os Campos São Obrigatórios'})   
        }

        const user = await User.findOne({email:email})

        if(!user){
            return res.status(422).json({message:'Usuário Não Existe'})
        }

        const CheckPass = await bcrypt.compare(senha,user.senha)

        if(!CheckPass){
            return res.status(422).json({message:'Senha Incorreta'})
        }

        await CreateUserToken(user,req,res)
    }
    
    static async checkUser(req, res) {
        let useratual;
    
        // Verifica se existe um cabeçalho de autorização
        if (req.headers.authorization) {
            const token = getToken(req); // Extrai o token do cabeçalho de autorização
            const decoded = jwt.verify(token, 'nossosecret'); // Decodifica o token usando a chave secreta 'secret'
    
            useratual = await User.findById(decoded.id); // Busca o usuário no banco pelo ID decodificado do token
    
            useratual.senha = undefined; // Remove a senha do objeto de usuário antes de enviar a resposta
        } else {
            useratual = null; // Se não houver token, define useratual como null
        }
    
        // Envia a resposta com o usuário atual ou null
        res.status(200).send(useratual);
    }
}