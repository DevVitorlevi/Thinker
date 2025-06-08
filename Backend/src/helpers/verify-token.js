const jwt = require('jsonwebtoken');
const getToken = require('./get-token');

const verifyToken = async (req, res, next) => {
    try {
        const token = getToken(req);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || seu_segredo_super_secreto_jwt, {
            algorithms: ['HS256'],
            issuer: 'thinker-api',
            audience: 'thinker-client'
        });

        // Adiciona verificação de blacklist de tokens aqui (se necessário)
        req.user = {
            id: decoded.id,
            role: decoded.role,
            token // Útil para logout posterior
        };

        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        
        const status = error.name === 'TokenExpiredError' 
            ? 401 
            : 403;
            
        return res.status(status).json({
            success: false,
            message: error.name === 'TokenExpiredError'
                ? 'Token expirado'
                : 'Token inválido'
        });
    }
};

module.exports = verifyToken;