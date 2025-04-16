// Importa o módulo 'multer' para fazer o upload de arquivos
const multer = require('multer');

// Importa o módulo 'path' para manipulação de caminhos de arquivos
const path = require('path');

// Configuração de armazenamento para as imagens
const Imagearmazenar = multer.diskStorage({
    // Define o diretório de destino para o armazenamento dos arquivos
    destination: function (req, file, cb) {
        let folder = ""; // Inicializa a variável para armazenar o nome da pasta

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

// Configuração do middleware de upload de imagens
const ImageUpload = multer({
    storage: Imagearmazenar, // Utiliza o armazenamento configurado acima
    fileFilter(req, file, cb) {
        // Verifica se o arquivo possui extensão .png ou .jpg
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // Se o arquivo não é válido, retorna um erro
            return cb(new Error('Por favor Escolha somente png ou jpg'));
        }

        // Se o arquivo é válido, permite o upload
        cb(undefined, true);
    }
});

// Exporta o middleware para ser utilizado em outras partes da aplicação
module.exports = { ImageUpload };