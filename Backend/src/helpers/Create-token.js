const jwt = require('jsonwebtoken');

module.exports = async (user, req, res) => {
    if (!user || !user._id || !user.role) {
        throw new Error('Dados do usuário inválidos para geração do token');
    }

    const tokenPayload = {
        id: user._id,
        role: user.role,
        iss: 'thinker-api',         // Emissor
        aud: 'thinker-client'       // Audiência
    };

    const token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET,
        { 
            expiresIn: process.env.JWT_EXPIRES_IN,
            algorithm: 'HS256'      // Algoritmo explícito
        }
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    );

    // HttpOnly cookie mais seguro
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    });

    return res.status(200).json({
        success: true,
        token,
        userId: user._id,
        role: user.role,
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};