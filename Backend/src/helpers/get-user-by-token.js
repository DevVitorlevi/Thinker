const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (token) => {
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || seu_segredo_super_secreto_jwt, {
            algorithms: ['HS256'],
            issuer: 'thinker-api',
            audience: 'thinker-client'
        });

        const user = await User.findById(decoded.id)
            .select('-senha -__v')
            .lean();

        if (!user || user.role !== decoded.role) {
            throw new Error('Usuário não encontrado ou permissão alterada');
        }

        return user;
    } catch (error) {
        console.error('Erro na verificação do token:', error.message);
        return null;
    }
};