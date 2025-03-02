const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const CreateUserToken = require('../helpers/Create-token')
const getToken = require("../helpers/get-token")
const getUserbyToken = require('../helpers/get-user-by-token')
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

    static async getUser (req,res){
        const id = req.params.id

        const user = await User.findById(id).select('-senha')

        if(!user){
            return res.status(422).json({message:'Usuário Não Encontrado'})
        }

        res.status(200).json({user:user})
    }

    static async editUser(req, res) {
        try {
            const id = req.params.id;
            const token = getToken(req);
            const user = await getUserbyToken(token);
    
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
    
            if (req.file) {
                user.image = req.file.filename;
                await user.save(); // Salvar a atualização
                return res.status(200).json({ message: "Foto atualizada com sucesso!", image: user.image });
            }
    
            return res.status(400).json({ message: "Nenhuma imagem foi enviada" });
    
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar foto", error });
        }
    }
    

    static async registerAdmin(req, res) {
        const { nome, email, senha, confirmesenha } = req.body;
        
        if (!nome || !email || !senha || !confirmesenha) {
            return res.status(422).json({ message: 'Todos os Campos São Obrigatórios' });
        }
        
        if (senha !== confirmesenha) {
            return res.status(422).json({ message: 'As senhas não coincidem.' });
        }

        try {
            const userExist = await User.findOne({ email: email });

            if (userExist) {
                return res.status(422).json({ message: 'Usuário Já Existe' });
            }

            const salt = await bcrypt.genSalt(12);
            const hashPass = await bcrypt.hash(senha, salt);

            const userData = new User({
                nome,
                email,
                senha: hashPass,
                role: 'admin' // Set role as admin
            });

            const userSave = await userData.save();
            await CreateUserToken(userSave, req, res);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Ocorreu um erro no servidor.', erro: err.message });
        }
    }

    static async loginAdmin(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(422).json({ message: 'Todos os Campos São Obrigatórios' });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(422).json({ message: 'Usuário Não Existe' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado. Usuário não é administrador.' });
        }

        const CheckPass = await bcrypt.compare(senha, user.senha);

        if (!CheckPass) {
            return res.status(422).json({ message: 'Senha Incorreta' });
        }

        await CreateUserToken(user, req, res);
    }

    static async deleteAdmin(req, res) {
        try {
            const id = req.params.id;
            const token = getToken(req);
            const currentUser = await getUserbyToken(token);

            // Check if the current user is an admin
            if (!currentUser || currentUser.role !== 'admin') {
                return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem excluir administradores.' });
            }

            // Prevent admin from deleting themselves
            if (currentUser._id.toString() === id) {
                return res.status(422).json({ message: 'Você não pode excluir sua própria conta de administrador.' });
            }

            const userToDelete = await User.findById(id);

            if (!userToDelete) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            if (userToDelete.role !== 'admin') {
                return res.status(422).json({ message: 'Este usuário não é um administrador.' });
            }

            await User.findByIdAndDelete(id);

            res.status(200).json({ message: 'Administrador excluído com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao excluir administrador.', error: error.message });
        }
    }
    static async checkAdminRole(req, res, next) {
        try {
            const token = getToken(req);
            const user = await getUserbyToken(token);

            if (!user || user.role !== 'admin') {
                return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar esta rota.' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Acesso não autorizado.' });
        }
    }
    }