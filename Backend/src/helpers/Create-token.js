const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = async (user,req,res)=>{
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET);  // Use process.env para garantir a segurança 

    res.status(200).json({
        message:'Autenticação Feita Com Sucesso',
        token:token,
        userId:user._id,
        role:user.role
    })
}