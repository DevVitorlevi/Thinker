// Importa o módulo jsonwebtoken para trabalhar com tokens JWT
const jwt = require('jsonwebtoken');

// Importa a função que extrai o token do cabeçalho de autorização
const getToken = require('./get-token');

// Define o middleware CheckToken
const CheckToken = (req, res, next) => {
    // Verifica se o cabeçalho de autorização está presente na requisição
    if (!req.headers.authorization) {
        // Se não estiver, retorna status 401 (Não autorizado)
        // com uma mensagem de "Acesso Negado"
        return res.status(401).json({ message: 'Acesso Negado' });
    }

    // Extrai o token do cabeçalho de autorização usando a função getToken
    const Token = getToken(req);

    // Verifica se o token foi extraído corretamente
    if (!Token) {
        // Se não houver token, retorna status 401 com "Acesso Negado"
        return res.status(401).json({ message: 'Acesso Negado' });
    }

    // Tenta verificar a validade do token
    try {
        // Decodifica e verifica o token usando a chave secreta
        const verificado = jwt.verify(Token, 'nossosecret');
        // Adiciona os dados decodificados do token ao objeto da requisição
        req.user = verificado;
        // Chama o próximo middleware ou rota, pois o token foi validado com sucesso
        next();
    } catch (err) {
        // Caso o token seja inválido, retorna status 400 com "Token Inválido"
        return res.status(400).json({ message: 'Token Inválido' });
    }
};
module.exports = CheckToken