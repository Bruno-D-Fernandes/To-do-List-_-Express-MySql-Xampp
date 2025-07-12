const UserModel = require('../models/userModel')

class userController {

    static async createAccount(req, res){
        try{   
            const {nameUser, emailUser, passwordUser} = req.body
            const resultado = await UserModel.createUser(nameUser, emailUser, passwordUser);
            res.status(201).json(resultado)
        }catch(e){
            res.status(500).json({erro: 'Erro ao criar conta'})
        }
    }

    static async updateAccount(req, res){
        try{
            const {idUser, nomeUser, emailUser, senhaUser} = req.body
            const resultado = await UserModel.updateUser(idUser, nomeUser, emailUser, senhaUser)
            res.status(201).json(resultado);   
        }catch(e){
            res.status(500).json({erro: 'erro ao atualizar dados da conta'})
        }
    }

        static async queryIdUser(req, res){
        try{
            const {idUser} = req.body
            const resultado = await UserModel.getUserById(idUser)
            res.status(201).json(resultado);   
        }catch(e){
            res.status(500).json({erro: 'erro ao atualizar dados da conta'})
        }
    }



}
module.exports = userController;