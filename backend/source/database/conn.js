const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/thinker')
    console.log('Conectado')
}

main().catch(err=>console.error(err))

module.exports = mongoose