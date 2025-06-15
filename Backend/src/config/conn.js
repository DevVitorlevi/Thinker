require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const mongoose = require('mongoose');

console.log('🧪 DB_URI:', process.env.DB_URI);

async function main() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao conectar ao MongoDB:', err);
  }
}

main();
