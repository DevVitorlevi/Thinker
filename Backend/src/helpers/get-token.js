module.exports = (req) => {
    const authHeader = req.headers['authorization'];
    return authHeader && authHeader.split(' ')[1]; // Retorna o token (Bearer <token>)
};