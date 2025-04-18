require('dotenv').config(); // Carrega variáveis de ambiente
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Importações de Rotas
const ConteudoRoutes = require('./routes/ConteudoRoutes');
const MateriaRoutes = require('./routes/MateriaRoutes');
const QuizRoutes = require('./routes/QuizRoutes');
const QuestaoRoutes = require('./routes/QuestaoRoutes');
const RankingRoutes = require('./routes/RankingRoutes');
const UserRoutes = require('./routes/UserRoutes');
const AdminRoutes = require('./routes/AdminRoutes');

// Configuração do Express
const app = express();

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Parseia JSON no body das requisições
app.use('/images', express.static(path.join(__dirname, 'public', 'images'))); // Serve arquivos estáticos

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro na conexão com MongoDB:', err));

// Rotas
app.use('/users', UserRoutes);
app.use('/admin', AdminRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do Sistema de Conteúdos e Quizzes');
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno no servidor' });
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});