const listModel = require('../models/taskModel');

class TaskController {
    static async criarTarefa(req, res) {
        try {
            const {tituloTarefa, descTarefa, idLista } = req.body;
            const resultado = await listModel.createTask(tituloTarefa, descTarefa, idLista);
            res.status(201).json(resultado);
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao criar lista', detalhe: e.message });
        }
    }

    static async deletaTarefa(req, res) {
        try {
            const { idTarefa } = req.body;
            const resultado = await listModel.deleteTask(idTarefa);
            res.status(201).json(resultado);
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao apagar lista', detalhe: e.message });
        }
    }

    static async atualizarTarefa(req, res) {
        try {
            const {idTarefa, tituloTarefa, descTarefa, idLista} = req.body;
            const resultado = await listModel.updateTask(idTarefa, tituloTarefa, descTarefa, idLista);
            res.status(201).json(resultado);
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao atualizar lista', detalhe: e.message });
        }
    }

    static async queryLists(req, res) {
        try {
            const {idLista} = req.body;
            const resultado = await listModel.listTasks(idLista);
            res.status(201).json(resultado);
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao consultar listas', detalhe: e.message });
        }
    }

}

module.exports = TaskController;