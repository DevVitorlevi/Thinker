module.exports = (req) => {
    // Verifica headers, cookies e query params
    let token = req.headers['authorization'] || 
                req.headers['x-access-token'] || 
                req.cookies?.token || 
                req.query?.token;

    if (!token) {
        throw new Error('Token não fornecido');
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (!token || token.length < 50) { // Verificação básica de comprimento
        throw new Error('Token malformado');
    }

    return token;
};