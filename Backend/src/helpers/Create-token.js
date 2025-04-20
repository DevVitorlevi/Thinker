const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    if (!user || !user._id || !user.role) {
        throw new Error('Dados do usuário inválidos para geração do token');
    }

    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );
};

module.exports = generateToken; // Exportação direta da função