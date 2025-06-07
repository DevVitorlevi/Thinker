

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CreateUserToken = require('../helpers/Create-token');
const getToken = require('../helpers/get-token');
const getUserbyToken = require('../helpers/get-user-by-token');

module.exports = class UserController {
    // Registrar um novo usuário
   static async register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ message: 'Usuário já existe.' });
    }

    const salt = await bcrypt.genSalt(12);
    const hashPass = await bcrypt.hash(password, salt);

    const userData = new User({
      name,
      email,
      password: hashPass,
      role: 'user',
    });

    const userSave = await userData.save();
    const token = await CreateUserToken(userSave, req, res);

    res.status(201).json({
      message: 'Sucesso ao registrar usuário.',
      user: {
        id: userSave._id,
        name: userSave.name,
        email: userSave.email,
        role: userSave.role,
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário.', error });
  }
}
    // Autenticar um usuário
    static async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
        }

        try {
            const user = await User.findOne({ email: email });

            if (!user) {
                return res.status(422).json({ message: 'Usuário não encontrado.' });
            }

            const checkPass = await bcrypt.compare(password, user.password);

            if (!checkPass) {
                return res.status(422).json({ message: 'Senha incorreta.' });
            }

            const token = await CreateUserToken(user, req, res);
            res.status(200).json({ message: 'Sucesso ao logar usuário.', user , token });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao autenticar usuário.', error });
        }
    }

    // Verificar usuário autenticado
    static async checkUser(req, res) {
        let userAtual;

        if (req.headers.authorization) {
            const token = getToken(req);
            const decoded = jwt.verify(token, 'nossosecret');

            userAtual = await User.findById(decoded.id);
            userAtual.password = undefined;
        } else {
            userAtual = null;
        }

        res.status(200).send(userAtual);
    }

    // Obter informações de um usuário
    static async getUser(req, res) {
        try {
            const id = req.params.id;

            // Busca o usuário
            const user = await User.findById(id)
                .select('-password') // Remove a senha da resposta

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter usuário.', error });
        }
    }

    // Editar informações do usuário
    static async editUser(req, res) {
        try {
            const id = req.params.id;
            const token = getToken(req);
            const user = await getUserbyToken(token);

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

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