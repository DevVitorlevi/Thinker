    const jwt = require('jsonwebtoken')
    // Função assíncrona que cria um token para autenticar o usuário
    const CreateUserToken = async (user, req, res) => {

        const token = jwt.sign({
            nome: user.nome, // Nome do usuário que será incluído no payload
            id: user._id     // ID único do usuário no banco de dados
        }, 'nossosecret');        // Chave secreta usada para criar a assinatura do token

        res.status(200).json({
            message: 'Você está autenticado', // Mensagem informando que a autenticação foi bem-sucedida
            token: token,                    // Token gerado para o usuário
            userId: user._id                 // ID do usuário (pode ser útil para o cliente)
        });
    };

    module.exports = CreateUserToken;