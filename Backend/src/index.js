// Carrega variáveis primeiro (caminho absoluto para .env)
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
console.log('[INIT] Ambiente:', process.env.NODE_ENV);

// Dependências principais
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('../src/config/conn');

// Inicializa Express
const app = express();

// Middlewares essenciais
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: process.env.MAX_FILE_SIZE_MB || '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos
app.use('/uploads', express.static(
  path.join(__dirname, '../public/uploads'),
  { maxAge: '1d' }
));

// Conecta ao MongoDB (com tratamento de erro)
connectDB().then(() => {
  console.log('[DB] Pronto para operações no banco de dados');
}).catch(err => {
  console.error('[DB] Falha crítica:', err);
  process.exit(1);
});

// Rota de saúde da API
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime()
  });
});

// Rota principal
app.get('/', (req, res) => {
  res.send(`
    <h1>API Thinker</h1>
    <p>Status: Online</p>
    <p>Banco de Dados: ${mongoose.connection.readyState === 1 ? '🟢 Conectado' : '🔴 Offline'}</p>
  `);
});

// Tratamento centralizado de erros
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({ 
    error: 'Erro interno',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Contate o suporte'
  });
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`
  🚀 Servidor rodando em: ${process.env.API_BASE_URL || `http://localhost:${PORT}`}
  📅 ${new Date().toLocaleString()}
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⛔ Encerrando por SIGTERM');
  server.close(() => {
    mongoose.connection.close();
    console.log('Processo finalizado');
  });
});