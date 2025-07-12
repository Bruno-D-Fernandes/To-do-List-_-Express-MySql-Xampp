const listModel = require('../models/ListModel');

class ListController {
    static async criarLista(req, res) {
        try {
            const { nomeLista, idUsuario } = req.body;
            const resultado = await listModel.createTaskList(nomeLista, idUsuario);
            res.status(201).json(resultado);
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao criar Lista', detalhe: e.message });
        }
    }

    static async deletarList(req, res) {
        try {
            const {idLista } = req.body;
            const resultado = await listModel.deleteTaskList(idLista);
            res.status(201).json(resultado);
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao apagar lista', detalhe: e.message });
        }
    }

    static async atualizartaskList(req, res) {
        try {
            const {idLista, novoNomeLista} = req.body;
            const resultado = await listModel.updateTaskList(idLista, novoNomeLista);
            res.status(201).json(resultado);
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao atualizar lista', detalhe: e.message });
        }
    }

    static async queryLists(req, res) {
        try {
            const {idUsuario} = req.body;
            const resultado = await listModel.listarTaskLists(idUsuario);
            res.status(201).json(resultado);
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao consultar listas', detalhe: e.message });
        }
    }

    


    static async queryListsID(req, res) {
        try {
            const {idUsuario, idLista} = req.body;
            const resultado = await listModel.listarTaskListPorId(idUsuario, idLista);
            res.status(201).json(resultado);
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao consultar lista', detalhe: e.message });
        }
    }


}

module.exports = ListController;