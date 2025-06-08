require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
console.log('🧪 DB_URI:', process.env.DB_URI || 'mongodb://127.0.0.1:27017/thinker'); // ADICIONE ISTO AQUI

const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.DB_URI || 'mongodb://127.0.0.1:27017/thinker');
  console.log('✅ Conectado ao MongoDB!');
}

main().catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));
