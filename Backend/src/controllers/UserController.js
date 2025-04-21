const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class UserController {
    // Registrar usuário
    static async register(req, res) {
        const { nome, email, senha, confirmesenha } = req.body;

        // Validações
        if (!nome || !email || !senha || !confirmesenha) {
            return res.status(422).json({ 
                success: false,
                message: 'Todos os campos são obrigatórios.' 
            });
        }

        if (senha !== confirmesenha) {
            return res.status(422).json({ 
                success: false,
                message: 'As senhas não coincidem.' 
            });
        }

        if (senha.length < 8) {
            return res.status(422).json({
                success: false,
                message: 'A senha deve ter no mínimo 8 caracteres.'
            });
        }

        try {
            // Verifica se usuário já existe (case insensitive)
            const userExist = await User.findOne({ email: email.toLowerCase() });
            if (userExist) {
                return res.status(409).json({ 
                    success: false,
                    message: 'Email já cadastrado.' 
                });
            }

            // Cria hash da senha
            const salt = await bcrypt.genSalt(12);
            const hashPass = await bcrypt.hash(senha, salt);

            // Cria novo usuário
            const user = new User({
                nome,
                email: email.toLowerCase(),
                senha: hashPass,
                role: 'user'
            });

            // Salva no banco de dados
            await user.save();

            // Gera token JWT
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET || 'nossosecret',
                { expiresIn: '7d' }
            );

            return res.status(201).json({
                success: true,
                message: 'Usuário cadastrado com sucesso!',
                token,
                user: {
                    id: user._id,
                    nome: user.nome,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (error) {
            console.error('Erro no registro:', error);
            return res.status(500).json({ 
                success: false,
                message: 'Erro ao registrar usuário.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    // Login usuário
    static async login(req, res) {
        const { email, senha } = req.body;

        // Validações
        if (!email || !senha) {
            return res.status(422).json({ 
                success: false,
                message: 'Email e senha são obrigatórios.' 
            });
        }

        try {
            // Busca usuário incluindo a senha (case insensitive)
            const user = await User.findOne({ email: email.toLowerCase() }).select('+senha');
            
            if (!user) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Usuário não encontrado.' 
                });
            }

            // Verifica senha
            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                return res.status(401).json({ 
                    success: false,
                    message: 'Credenciais inválidas.' 
                });
            }

            // Atualiza último login
            user.ultimoLogin = new Date();
            await user.save();

            // Gera novo token JWT
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET || 'nossosecret',
                { expiresIn: '7d' }
            );

            // Remove a senha antes de retornar
            const userResponse = user.toObject();
            delete userResponse.senha;

            return res.status(200).json({
                success: true,
                message: 'Login realizado com sucesso!',
                token,
                user: userResponse
            });

        } catch (error) {
            console.error('Erro no login:', error);
            return res.status(500).json({ 
                success: false,
                message: 'Erro ao realizar login.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    // Verificar usuário autenticado
    static async checkUser(req, res) {
        try {
            let currentUser = null;

            if (req.headers.authorization) {
                const token = getToken(req);
                const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nossosecret');
                currentUser = await User.findById(decoded.id).select('-senha');
            }

            return res.status(200).json({
                success: true,
                user: currentUser
            });

        } catch (error) {
            console.error('Erro ao verificar usuário:', error);
            return res.status(500).json({ 
                success: false,
                message: 'Erro ao verificar usuário.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    // Obter usuário por ID
    static async getUser(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findById(id)
                .select('-senha')
                .populate('quizzes_respondidos.quiz', 'titulo');

            if (!user) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Usuário não encontrado.' 
                });
            }

            return res.status(200).json({ 
                success: true,
                user 
            });

        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            return res.status(500).json({ 
                success: false,
                message: 'Erro ao buscar usuário.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    // Editar imagem do usuário
    static async editUser(req, res) {
        try {
            const token = getToken(req);
            const user = await getUserByToken(token);

            if (!user) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Usuário não encontrado.' 
                });
            }

            if (req.file) {
                user.image = req.file.filename;
                await user.save();
                
                return res.status(200).json({ 
                    success: true,
                    message: 'Imagem atualizada com sucesso!',
                    image: user.image 
                });
            }

            return res.status(400).json({ 
                success: false,
                message: 'Nenhuma imagem enviada.' 
            });

        } catch (error) {
            console.error('Erro ao atualizar imagem:', error);
            return res.status(500).json({ 
                success: false,
                message: 'Erro ao atualizar imagem.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    // Atualizar perfil
    static async updateProfile(req, res) {
        const { nome } = req.body;
        
        try {
            const token = getToken(req);
            const user = await getUserByToken(token);
            
            if (!user) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Usuário não encontrado.' 
                });
            }

            if (nome) user.nome = nome;
            await user.save();

            // Remove a senha antes de retornar
            const userResponse = user.toObject();
            delete userResponse.senha;

            return res.status(200).json({ 
                success: true,
                message: 'Perfil atualizado com sucesso!',
                user: userResponse
            });

        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            return res.status(500).json({ 
                success: false,
                message: 'Erro ao atualizar perfil.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    // Obter estatísticas do usuário
    static async getStats(req, res) {
        try {
            const token = getToken(req);
            const user = await getUserByToken(token);
            
            if (!user) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Usuário não encontrado.' 
                });
            }

            return res.status(200).json({ 
                success: true,
                estatisticas: user.estatisticas 
            });

        } catch (error) {
            console.error('Erro ao buscar estatísticas:', error);
            return res.status(500).json({ 
                success: false,
                message: 'Erro ao buscar estatísticas.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};