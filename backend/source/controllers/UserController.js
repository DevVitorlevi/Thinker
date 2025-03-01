const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports =  class UserController{

    static async register(req,res){
        const { nome, email, telefone, senha, confirmesenha } = req.body;

        
    }
}