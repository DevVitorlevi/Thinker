const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Garante que o diretório de upload existe
const ensureDir = (path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = 'default';
        
        if (req.baseUrl.includes('users')) {
            folder = `users/${req.user?._id || 'unknown'}`;
        } else if (req.baseUrl.includes('content')) {
            folder = 'content';
        }

        const uploadPath = path.join(__dirname, '..', 'public', 'images', folder);
        ensureDir(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de arquivo inválido. Apenas JPEG, PNG e WEBP são permitidos.'), false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE_MB) * 1024 * 1024 || 5 * 1024 * 1024
    },
    fileFilter
});

// Middleware para tratamento de erros
const handleUploadErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: err.code === 'LIMIT_FILE_SIZE' 
                ? 'Arquivo muito grande' 
                : 'Erro no upload do arquivo'
        });
    } else if (err) {
        return res.status(400).json({ 
            success: false, 
            message: err.message 
        });
    }
    next();
};

module.exports = {
    ImageUpload: upload,
    handleUploadErrors
};  