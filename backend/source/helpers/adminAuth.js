const jwt = require('jsonwebtoken');
const User = require('../models/User');
const getToken = require('./get-token');

module.exports = async function (req, res, next) {
    try {
        const token = getToken(req);
        if (!token) {
            return res.status(401).json({ message: 'Acesso negado!' });
        }

        const decoded = jwt.verify(token, 'nossosecret'); // Decodifica o token
        const user = await User.findById(decoded.id);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Apenas administradores podem acessar!' });
        }

        req.user = user; // Adiciona o usuário ao request
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido!' });
    }
};
