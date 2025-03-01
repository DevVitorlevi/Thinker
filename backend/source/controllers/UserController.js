const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports =  class UserController{

    static async register(req,res){
        const { nome, email,senha, confirmesenha } = req.body;
        
        if (!nome||!email||!senha || !confirmesenha){
            res.status(422).json({message:'Todos os Campos São Obrigatórios'})
        }
    }
}