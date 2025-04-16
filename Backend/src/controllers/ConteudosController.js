const Conteudo = require('../models/Conteudos')

module.exports = class ConteudoControler {
    static async create (req,res){
        try {
            const {titulo,conceitos,materia} = req.body
            
            if (!titulo || !conceitos || !materia || !req.files || req.files.length === 0) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios, incluindo as imagens.' });
            }
        
            const images = req.files.map(file => `../public/images/content/${file.filename}`)
            const novoConteudo = new Conteudo({
                titulo,
                conceitos,
                imagens:images,
                materia
            })
            
            await novoConteudo.save()// Enviando para o Banco

            res.status(201).json({message:'Conteudo Criado Com Sucesso', conteudo: novoConteudo})

        } catch (error) {
            res.status(500).json({
                message:'Erro ao Criar Conteudo', error
            })                         
        }
    }
}