const express = require('express');
const cors = require('cors');
const conn = require('./database/conn');
const app = express();

// JSON Middleware
app.use(express.json());

// CORS Middleware
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Public Directory
app.use(express.static('public'));

// Importando Rotas
const UserRoutes = require('./routes/UserRoutes');
const AdminRoutes = require('./routes/AdminRoutes');

// Definição das Rotas
app.use('/user', UserRoutes);
app.use('/admin',AdminRoutes)

// Iniciando o Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
