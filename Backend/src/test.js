const bcrypt = require('bcryptjs');

// Senha fornecida
const senha = '12345678';

// Gerar o hash manualmente
bcrypt.genSalt(12, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(senha, salt, (err, hash) => {
        if (err) throw err;
        console.log('Hash gerado manualmente:', hash);
    });
});
