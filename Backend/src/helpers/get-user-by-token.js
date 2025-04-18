const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (token) => {
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use a variável de ambiente
        return await User.findById(decoded.id);
    } catch (error) {
        return null;  // Caso o token seja inválido, retorna null
    }
};
    