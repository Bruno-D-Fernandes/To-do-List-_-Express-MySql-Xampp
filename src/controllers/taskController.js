const taskModel = require('../models/taskModel'); 

class TaskController {
    static async criarTarefa(req, res) {
        try {
            const { tituloTarefa, descTarefa, idLista } = req.body;
            const resultado = await taskModel.createTask(tituloTarefa, descTarefa, idLista);

            res.status(201).json({
                ok: true,
                mensagem: 'Tarefa criada com sucesso!',
                idTarefa: resultado.insertId 
            });
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao criar tarefa', detalhe: e.message });
        }
    }

    static async deletaTarefa(req, res) {
        try {
            const { idTarefa } = req.body;
            await taskModel.deleteTask(idTarefa);

            res.status(200).json({
                ok: true,
                mensagem: 'Tarefa deletada com sucesso!'
            });
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao apagar tarefa', detalhe: e.message });
        }
    }

    static async atualizarTarefa(req, res) {
        try {
            const { idTarefa, tituloTarefa, descTarefa, idLista } = req.body;
            await taskModel.updateTask(idTarefa, tituloTarefa, descTarefa, idLista);

            res.status(200).json({
                ok: true,
                mensagem: 'Tarefa atualizada com sucesso!'
            });
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao atualizar tarefa', detalhe: e.message });
        }
    }

    static async queryLists(req, res) {
        try {
            const { idLista } = req.body;
            const tarefas = await taskModel.listTasks(idLista);

            res.status(200).json({
                ok: true,
                mensagem: 'Tarefas consultadas com sucesso!',
                tarefas: tarefas
            });
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao consultar tarefas', detalhe: e.message });
        }
    }
}

module.exports = TaskController;
