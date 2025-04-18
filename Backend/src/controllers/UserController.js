const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CreateUserToken = require('../helpers/Create-token');
const getToken = require('../helpers/get-token');
const getUserbyToken = require('../helpers/get-user-by-token');

module.exports = class UserController {
    static async register(req, res) {
        const { nome, email, senha, confirmesenha } = req.body;

        if (!nome || !email || !senha || !confirmesenha) {
            return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
        }

        if (senha !== confirmesenha) {
            return res.status(422).json({ message: 'As senhas não coincidem.' });
        }

        try {
            const userExist = await User.findOne({ email });
            if (userExist) return res.status(422).json({ message: 'Usuário já existe.' });

            const salt = await bcrypt.genSalt(12);
            const hashPass = await bcrypt.hash(senha, salt);

            const userData = new User({ nome, email, senha: hashPass, role: 'user' });
            const userSave = await userData.save();
            await CreateUserToken(userSave, req, res);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar usuário.', error });
        }
    }

    static async login(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(422).json({ message: 'Usuário não encontrado.' });

            const checkPass = await bcrypt.compare(senha, user.senha);
            if (!checkPass) return res.status(422).json({ message: 'Senha incorreta.' });

            await CreateUserToken(user, req, res);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao autenticar usuário.', error });
        }
    }

    static async checkUser(req, res) {
        let userAtual;

        if (req.headers.authorization) {
            const token = getToken(req);
            const decoded = jwt.verify(token, 'nossosecret');

            userAtual = await User.findById(decoded.id);
            userAtual.senha = undefined;
        } else {
            userAtual = null;
        }

        res.status(200).send(userAtual);
    }

    static async getUser(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id).select('-senha');
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter usuário.', error });
        }
    }

    static async editUser(req, res) {
        try {
            const id = req.params.id;
            const token = getToken(req);
            const user = await getUserbyToken(token);

            if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

            if (req.file) {
                user.image = req.file.filename;
                await user.save();
                return res.status(200).json({ message: 'Foto atualizada com sucesso!', image: user.image });
            }

            return res.status(400).json({ message: 'Nenhuma imagem foi enviada.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar foto.', error });
        }
    }
};