const fs = require("fs"); // Importa File System
const multer = require("multer");
const path = require("path");

const Imagearmazenar = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "users"; // Define a pasta padrão

        const uploadPath = path.join(__dirname, `../public/images/${folder}`);

        // Verifica se a pasta existe, se não, cria
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));
    }
});

const ImageUpload = multer({
    storage: Imagearmazenar,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor escolha somente PNG ou JPG"));
        }
        cb(undefined, true);
    }
});

module.exports = { ImageUpload };
