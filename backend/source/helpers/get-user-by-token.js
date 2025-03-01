const jwt = require('jsonwebtoken');  
const User = require('../models/User');  

// Função que obtém um usuário com base no token JWT  
const getUserbyToken = async (token) => {  
    // Verifica se o token foi passado  
    if (!token) {  
        // Se o token não existir, retorna um status 401 (Unauthorized) e uma mensagem de erro  
        return res.status(401).json({ message: 'Acesso Negado' });  
    }  

    // Decodifica o token para extrair os dados do usuário usando a chave secreta  
    const decoded = jwt.verify(token, 'nossosecret');  

    // Obtém o ID do usuário a partir do token decodificado  
    const userid = decoded.id;  

    // Busca o usuário no banco de dados pelo ID extraído do token  
    const user = await User.findOne({ _id: userid });  

    // Retorna o usuário encontrado  
    return user;  
};  

// Exporta a função para que ela possa ser usada em outros arquivos  
module.exports = getUserbyToken;  