require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/conn'); // Importa a conexão com o MongoDB

// Rotas
const adminRoutes = require('./routes/AdminRoutes');
const userRoutes = require('./routes/UserRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);


// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno no servidor!' });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
