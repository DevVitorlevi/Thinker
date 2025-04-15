const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Carrega .env da pasta raiz
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Verificação DEBUG
console.log('[DB] NODE_ENV:', process.env.NODE_ENV);
console.log('[DB] MONGODB_URI:', process.env.MONGODB_URI ? '✅ OK' : '❌ Faltando');

// Fallback para desenvolvimento local
const DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thinker';

if (!DB_URI) {
  console.error('❌ ERRO: MONGODB_URI não definida');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    console.log(`✅ MongoDB Conectado: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('❌ ERRO de conexão:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, mongoose };