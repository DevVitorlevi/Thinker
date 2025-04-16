const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (token) => {
    if (!token) return null;

    const decoded = jwt.verify(token, 'nossosecret');
    return await User.findById(decoded.id);
};