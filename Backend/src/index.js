require('dotenv').config({ path: __dirname + '/.env' }); // Caminho absoluto
const express = require('express');
const mongoose = require('mongoose');

// Verificação debug das variáveis
console.log('Variáveis de ambiente carregadas:', {
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI ? '***' : 'NÃO ENCONTRADA'
});

// Configuração de conexão com fallback explícito
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thinker';

const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  retryWrites: true,
  w: 'majority'
};

mongoose.connect(MONGODB_URI, dbConfig)
  .then(() => {
    console.log('✅ Conectado ao MongoDB com sucesso!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('📡 Host:', mongoose.connection.host);
  })
  .catch(err => {
    console.error('❌ Falha na conexão com MongoDB:', err.message);
    console.error('📌 URI usada:', MONGODB_URI);
    process.exit(1);
});

// Eventos de conexão
mongoose.connection.on('connected', () => {
  console.log('📊 Mongoose conectado ao DB');
});

mongoose.connection.on('error', (err) => {
  console.error('⚠️ Erro na conexão do Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose desconectado');
});

// Resto da configuração do Express...
const app = express();

// ... outras configurações

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});