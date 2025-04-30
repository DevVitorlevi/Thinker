const User = require('../models/User');
const bcrypt = require('bcryptjs');
const CreateUserToken = require('../helpers/Create-token');
const getToken = require('../helpers/get-token');
const getUserbyToken = require('../helpers/get-user-by-token');

module.exports = class AdminController   {
    // Registrar um novo administrador
    static async registerAdmin(req, res) {
        const { nome, email, senha, confirmesenha } = req.body;

        if (!nome || !email || !senha || !confirmesenha) {
            return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
        }

        if (senha !== confirmesenha) {
            return res.status(422).json({ message: 'As senhas não coincidem.' });
        }

        try {
            const userExist = await User.findOne({ email: email });

            if (userExist) {
                return res.status(422).json({ message: 'Usuário já existe.' });
            }

            const salt = await bcrypt.genSalt(12);
            const hashPass = await bcrypt.hash(senha, salt);

            const userData = new User({
                nome,
                email,
                senha: hashPass,
                role: 'admin', // Define o papel como admin
            });

            const userSave = await userData.save();
            const token = await CreateUserToken(userSave, req, res);
            res.status(201).json({ message: 'Sucesso ao registrar administrador.', userData,token });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar administrador.', error });
        }
    }

    // Autenticar um administrador
    static async loginAdmin(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
        }

        try {
            const user = await User.findOne({ email: email });

            if (!user) {
                return res.status(422).json({ message: 'Usuário não encontrado.' });
            }

            if (user.role !== 'admin') {
                return res.status(403).json({ message: 'Acesso negado. Usuário não é administrador.' });
            }

            const checkPass = await bcrypt.compare(senha, user.senha);

            if (!checkPass) {
                return res.status(422).json({ message: 'Senha incorreta.' });
            }

            const token = await CreateUserToken(user, req, res);
            res.status(200).json({ message: 'Sucesso ao Logar administrador.', user,token});
        } catch (error) {
            res.status(500).json({ message: 'Erro ao autenticar administrador.', error });
        }
    }

    // Deletar um administrador
    static async deleteAdmin(req, res) {
        try {
            const id = req.params.id;
            const token = getToken(req);
            const currentUser = await getUserbyToken(token);

            // Verifica se o usuário atual é um administrador
            if (!currentUser || currentUser.role !== 'admin') {
                return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem excluir administradores.' });
            }

            // Impede que o administrador exclua a si mesmo
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
            res.status(500).json({ message: 'Erro ao excluir administrador.', error });
        }
    }

    // Verificar se o usuário é um administrador
    static async checkAdminRole(req, res, next) {
        try {
            const token = getToken(req);
            const user = await getUserbyToken(token);

            if (!user || user.role !== 'admin') {
                return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar esta rota.' });
            }

            next();
        } catch (error) {
            res.status(401).json({ message: 'Acesso não autorizado.' });
        }
    }
};