require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/conn'); // Importa a conexão com o MongoDB

// Rotas
const adminRoutes = require('./routes/AdminRoutes');
const userRoutes = require('./routes/UserRoutes');
const quizRoutes = require('./routes/QuizzesRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);
app.use('/quizzes', quizRoutes);


// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno no servidor!' });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
