const User = require('../models/User');
const bcrypt = require('bcryptjs');
const CreateUserToken = require('../helpers/Create-token');
const getToken = require('../helpers/get-token');
const getUserbyToken = require('../helpers/get-user-by-token');

module.exports = class UserController {
    // Registrar usuário
    static async register(req, res) {
        const { nome, email, senha, confirmesenha } = req.body;

        if (!nome || !email || !senha || !confirmesenha) {
            return res.status(422).json({ message: 'Preencha todos os campos.' });
        }

        if (senha !== confirmesenha) {
            return res.status(422).json({ message: 'As senhas não coincidem.' });
        }

        try {
            const userExist = await User.findOne({ email });
            if (userExist) {
                return res.status(422).json({ message: 'Email já cadastrado.' });
            }

            const salt = await bcrypt.genSalt(12);
            const hashPass = await bcrypt.hash(senha, salt);

            const user = new User({
                nome,
                email,
                senha: hashPass,
                role: 'user'
            });

            await user.save();
            await CreateUserToken(user, req, res);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar.', error });
        }
    }

    // Login usuário
    static async login(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(422).json({ message: 'Email e senha são obrigatórios.' });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            const checkPass = await bcrypt.compare(senha, user.senha);
            if (!checkPass) {
                return res.status(422).json({ message: 'Senha inválida.' });
            }

            await CreateUserToken(user, req, res);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao logar.', error });
        }
    }

    // Verificar usuário
    static async checkUser(req, res) {
        let currentUser;

        if (req.headers.authorization) {
            const token = getToken(req);
            const decoded = jwt.verify(token, 'nossosecret');
            currentUser = await User.findById(decoded.id);
            currentUser.senha = undefined;
        }

        res.status(200).send(currentUser || null);
    }

    // Obter usuário por ID
    static async getUser(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findById(id)
                .select('-senha')
                .populate('quizzes_respondidos.quiz', 'titulo');

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuário.', error });
        }
    }

    // Editar usuário (imagem)
    static async editUser(req, res) {
        try {
            const id = req.params.id;
            const token = getToken(req);
            const user = await getUserbyToken(token);

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            if (user._id.toString() !== id) {
                return res.status(403).json({ message: 'Acesso negado.' });
            }

            if (req.file) {
                user.image = req.file.filename;
                await user.save();
                return res.status(200).json({ 
                    message: 'Imagem atualizada!',
                    image: user.image 
                });
            }

            res.status(400).json({ message: 'Nenhuma imagem enviada.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar.', error });
        }
    }

    // Atualizar perfil (novo método adicionado)
    static async updateProfile(req, res) {
        const { nome } = req.body;
        const userId = req.user.id;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            if (nome) user.nome = nome;
            await user.save();

            res.status(200).json({ 
                message: 'Perfil atualizado!',
                user: {
                    _id: user._id,
                    nome: user.nome,
                    email: user.email,
                    image: user.image
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar.', error });
        }
    }

    // Obter estatísticas (novo método adicionado)
    static async getStats(req, res) {
        const userId = req.user.id;

        try {
            const user = await User.findById(userId).select('estatisticas');
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            res.status(200).json({ estatisticas: user.estatisticas });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar estatísticas.', error });
        }
    }

    static async completarQuiz(req, res) {
        const { quizId, acertos, totalQuestoes } = req.body;
        const userId = req.user.id;

        try {
            // ... (código existente)

            // Calcula pontos (10 pontos por questão acertada)
            const pointsEarned = acertos * 10;

            // Atualiza ranking
            await RankingController.updateUserPoints(
                { body: { userId, pointsEarned } }, 
                { status: () => {}, json: () => {} }
            );

            res.status(200).json({
                message: 'Quiz completado!',
                estatisticas: user.estatisticas,
                pointsEarned
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao completar quiz.', error });
        }
    }
};