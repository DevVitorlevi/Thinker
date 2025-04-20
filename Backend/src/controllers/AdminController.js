const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../helpers/Create-token'); // Importação correta
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class AdminController {
    // Middleware para verificar admin
    static async checkAdmin(req, res, next) {
        try {
            const token = getToken(req);
            const user = await getUserByToken(token);

            if (!user || user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'Acesso restrito a administradores'
                });
            }

            req.admin = user;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Token inválido ou expirado'
            });
        }
    }

    // Registrar novo admin
    static async registerAdmin(req, res) {
        const { nome, email, senha, confirmesenha } = req.body;

        // Validações
        if (!nome || !email || !senha || !confirmesenha) {
            return res.status(422).json({ 
                success: false,
                message: 'Todos os campos são obrigatórios' 
            });
        }

        if (senha !== confirmesenha) {
            return res.status(422).json({ 
                success: false,
                message: 'As senhas não coincidem' 
            });
        }

        try {
            const userExist = await User.findOne({ email });
            if (userExist) {
                return res.status(409).json({ 
                    success: false,
                    message: 'Email já cadastrado' 
                });
            }

            const salt = await bcrypt.genSalt(12);
            const hashPass = await bcrypt.hash(senha, salt);

            const admin = new User({
                nome,
                email,
                senha: hashPass,
                role: 'admin'
            });

            await admin.save();
            
            // Gera token usando a nova função
            const token = generateToken(admin);

            return res.status(201).json({
                success: true,
                message: 'Admin criado com sucesso',
                token,
                adminId: admin._id
            });

        } catch (error) {
            console.error('Erro ao registrar admin:', error);
            return res.status(500).json({ 
                success: false,
                message: 'Erro ao registrar administrador',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    // Login admin
    static async login(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(422).json({
                success: false,
                message: 'Email e senha são obrigatórios'
            });
        }

        try {
            const user = await User.findOne({ email, role: 'admin' });
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Admin não encontrado'
                });
            }

            const checkPass = await bcrypt.compare(senha, user.senha);
            if (!checkPass) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciais inválidas'
                });
            }

            const token = await generateToken(user,req,res)
            return res.status(200).json({
                success: true,
                message: 'Login realizado com sucesso',
                token,
                userId: user._id,
                role: user.role
            });

        } catch (error) {
            console.error('Erro no login admin:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno no servidor',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    // Deletar admin
    static async deleteAdmin(req, res) {
        try {
            const { id } = req.params;
            const token = getToken(req);
            const currentUser = await getUserByToken(token);

            if (!currentUser || currentUser.role !== 'admin') {
                return res.status(403).json({ 
                    success: false,
                    message: 'Acesso negado. Apenas administradores podem excluir administradores.' 
                });
            }

            if (currentUser._id.toString() === id) {
                return res.status(422).json({ 
                    success: false,
                    message: 'Você não pode excluir sua própria conta.' 
                });
            }

            const adminToDelete = await User.findOne({ _id: id, role: 'admin' });
            if (!adminToDelete) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Administrador não encontrado.' 
                });
            }

            await User.findByIdAndDelete(id);
            return res.status(200).json({ 
                success: true,
                message: 'Administrador excluído com sucesso.' 
            });

        } catch (error) {
            console.error('Erro ao excluir admin:', error);
            return res.status(500).json({ 
                success: false,
                message: 'Erro ao excluir administrador',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};