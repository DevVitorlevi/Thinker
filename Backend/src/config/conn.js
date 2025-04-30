require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
console.log('🧪 DB_URI:', process.env.DB_URI); // ADICIONE ISTO AQUI

const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.DB_URI);
  console.log('✅ Conectado ao MongoDB!');
}

main().catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));
