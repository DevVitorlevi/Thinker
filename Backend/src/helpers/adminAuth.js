const getToken = require('./get-token');
const getUserbyToken = require('./get-user-by-token');

module.exports = async function adminAuth(req, res, next) {
    try {
        // Verifica se há token no header
        const token = getToken(req);
        if (!token) {
            return res.status(401).json({ message: 'Acesso negado! Token não fornecido.' });
        }

        // Verifica e decodifica o token
        const user = await getUserbyToken(token);
        if (!user) {
            return res.status(401).json({ message: 'Token inválido ou expirado.' });
        }

        // Verifica se o usuário é admin
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Acesso restrito a administradores.' });
        }

        // Adiciona o usuário à requisição para uso posterior
        req.user = user;
        next();
    } catch (error) {
        console.error('Erro no middleware adminAuth:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};