const User = require('../models/User');
const bcrypt = require('bcryptjs');
const CreateUserToken = require('../helpers/Create-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class AdminController {
    // Middleware para verificar se é admin
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

            req.admin = user; // Armazena o admin na requisição
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Token inválido ou expirado'
            });
        }
    }

    // Criar novo admin (apenas por admin existente)
    static async createAdmin(req, res) {
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
            // Verifica se usuário já existe
            const userExist = await User.findOne({ email });
            if (userExist) {
                return res.status(409).json({
                    success: false,
                    message: 'Email já está em uso'
                });
            }

            // Cria hash da senha
            const salt = await bcrypt.genSalt(12);
            const hashPass = await bcrypt.hash(senha, salt);

            // Cria novo admin
            const newAdmin = new User({
                nome,
                email,
                senha: hashPass,
                role: 'admin',
                criadoPor: req.admin._id // Registra quem criou
            });

            await newAdmin.save();

            return res.status(201).json({
                success: true,
                message: 'Admin criado com sucesso',
                adminId: newAdmin._id
            });

        } catch (error) {
            console.error('Erro ao criar admin:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno no servidor'
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

            // Verifica senha
            const checkPass = await bcrypt.compare(senha, user.senha);
            if (!checkPass) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciais inválidas'
                });
            }

            // Retorna token
            return await CreateUserToken(user, req, res);
        } catch (error) {
            console.error('Erro no login admin:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno no servidor'
            });
        }
    }

    // Listar todos os admins (apenas para admins)
    static async listAdmins(req, res) {
        try {
            const admins = await User.find({ role: 'admin' })
                .select('-senha -__v -quizzes_respondidos')
                .populate('criadoPor', 'nome email');

            return res.status(200).json({
                success: true,
                admins
            });
        } catch (error) {
            console.error('Erro ao listar admins:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno no servidor'
            });
        }
    }

    // Atualizar admin
    static async updateAdmin(req, res) {
        const { id } = req.params;
        const { nome, email } = req.body;

        try {
            // Verifica se admin existe
            const admin = await User.findById(id);
            if (!admin || admin.role !== 'admin') {
                return res.status(404).json({
                    success: false,
                    message: 'Admin não encontrado'
                });
            }

            // Atualiza dados
            if (nome) admin.nome = nome;
            if (email) admin.email = email;

            await admin.save();

            return res.status(200).json({
                success: true,
                message: 'Admin atualizado com sucesso'
            });
        } catch (error) {
            console.error('Erro ao atualizar admin:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno no servidor'
            });
        }
    }

    // Desativar admin (não deletar, apenas marcar como inativo)
    static async deactivateAdmin(req, res) {
        const { id } = req.params;

        try {
            // Não permite desativar a si mesmo
            if (req.admin._id.toString() === id) {
                return res.status(403).json({
                    success: false,
                    message: 'Você não pode desativar sua própria conta'
                });
            }

            const admin = await User.findByIdAndUpdate(
                id,
                { ativo: false },
                { new: true }
            );

            if (!admin) {
                return res.status(404).json({
                    success: false,
                    message: 'Admin não encontrado'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Admin desativado com sucesso'
            });
        } catch (error) {
            console.error('Erro ao desativar admin:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno no servidor'
            });
        }
    }
};