const UserModel = require('../models/userModel');

class userController {
    static async createAccount(req, res) {
        try {
            const { nameUser, emailUser, passwordUser } = req.body;
            const resultado = await UserModel.createUser(nameUser, emailUser, passwordUser);

            res.status(201).json({
                ok: true,
                mensagem: 'Conta criada com sucesso!',
                idUsuario: resultado.insertId 
            });
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao criar conta', detalhe: e.message });
        }
    }

    static async updateAccount(req, res) {
        try {
            const { nomeUser, emailUser, senhaUser } = req.body;
            const idUser = req.usuario.id;
            await UserModel.updateUser(idUser, nomeUser, emailUser, senhaUser);

            res.status(200).json({
                ok: true,
                mensagem: 'Dados da conta atualizados com sucesso!'
            });
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao atualizar dados da conta', detalhe: e.message });
        }
    }

    static async queryIdUser(req, res) {
        try {
            const { idUser } = req.body;
            const [usuario] = await UserModel.getUserById(idUser);

            res.status(200).json({
                ok: true,
                mensagem: 'Usuário consultado com sucesso!',
                usuario: usuario 
            });
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao consultar dados do usuário', detalhe: e.message });
        }
    }
}

module.exports = userController;
