require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

// Importações de Rotas
const UserRoutes = require('./routes/UserRoutes');
const AdminRoutes = require('./routes/AdminRoutes');

// Configuração do Express
const app = express();

// Configuração do Rate Limiting (baseado no seu .env)
const limiter = rateLimit({
  windowMs: eval(process.env.RATE_LIMIT_WINDOW_MS), // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX), // 100 requisições
  message: 'Muitas requisições deste IP, tente novamente mais tarde.'
});

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(helmet()); // Segurança HTTP
app.use(limiter); // Aplica rate limiting global
app.use(express.json({ limit: `${process.env.MAX_FILE_SIZE_MB}mb` }));
app.use(morgan('dev')); // Logging de requisições
app.use('/images', express.static(path.join(__dirname, process.env.UPLOAD_FOLDER)));

// Conexão com o MongoDB (com melhor tratamento de erro)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('✅ Conectado ao MongoDB com sucesso!'))
.catch(err => {
  console.error('❌ Falha na conexão com MongoDB:', err.message);
  process.exit(1); // Encerra o processo se não conectar
});

// Verificação de conexão com o banco de dados
mongoose.connection.on('connected', () => {
  console.log('📊 Mongoose conectado ao DB');
});

mongoose.connection.on('error', (err) => {
  console.error('⚠️ Erro na conexão do Mongoose:', err);
});

// Rotas
app.use('/api/users', UserRoutes); // Prefixo /api para versionamento futuro
app.use('/api/admin', AdminRoutes);

// Rota de status/health check
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'OK',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Tratamento de erros global aprimorado
app.use((err, req, res, next) => {
  console.error(`🚨 [${new Date().toISOString()}] Erro:`, err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'development' 
    ? err.message 
    : 'Ocorreu um erro interno no servidor';
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Rota para 404 (não encontrado)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint não encontrado'
  });
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Acesse: ${process.env.API_BASE_URL || `http://localhost:${PORT}`}`);
});

// Tratamento de encerramento gracioso
process.on('SIGTERM', () => {
  console.log('🛑 Recebido SIGTERM. Encerrando servidor...');
  server.close(() => {
    console.log('🔴 Servidor encerrado');
    mongoose.connection.close(false, () => {
      console.log('📴 Conexão com MongoDB encerrada');
      process.exit(0);
    });
  });
});