module.exports = (req) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        throw new Error("Token não fornecido");
    }
    return authHeader.split(' ')[1]; // Retorna o token (Bearer <token>)
};
