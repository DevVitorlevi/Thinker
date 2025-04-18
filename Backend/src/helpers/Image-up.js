// Importa o módulo 'multer' para fazer o upload de arquivos
const multer = require('multer');

// Importa o módulo 'path' para manipulação de caminhos de arquivos
const path = require('path');

// Configuração de armazenamento para as imagens
const Imagearmazenar = multer.diskStorage({
    // Define o diretório de destino para o armazenamento dos arquivos
    destination: function (req, file, cb) {
        let folder = req.user._id ? `users/${req.user._id}` : 'default';

        // Verifica a URL base da requisição para determinar a pasta de destino
        if (req.baseUrl.includes("users")) {
            folder = "users"; // Se a URL base contém "users", a pasta será "users"
        } else if (req.baseUrl.includes("content")) {
            folder = "content"; // Se a URL base contém "pets", a pasta será "pets"
        }

        // Define o caminho completo da pasta onde o arquivo será armazenado
        cb(null, `public/images/${folder}`);
    },

    // Define o nome do arquivo ao salvá-lo
    filename: function (req, file, cb) {
        // O nome do arquivo será o timestamp atual + a extensão original do arquivo
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));
    }
});

const ImageUpload = multer({
    storage: Imagearmazenar,
    limits: { fileSize: 5 * 1024 * 1024 },  // Limite de tamanho do arquivo (5MB)
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Por favor escolha somente arquivos .png ou .jpg'));
        }
        cb(undefined, true);
    }
});


// Exporta o middleware para ser utilizado em outras partes da aplicação
module.exports = { ImageUpload };