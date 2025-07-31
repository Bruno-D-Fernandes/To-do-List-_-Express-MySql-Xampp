const listModel = require('../models/ListModel');

class ListController {
    static async criarLista(req, res) {
        try {
            const idUsuario = req.usuario.id;
            const { nomeLista } = req.body;
            const resultado = await listModel.createTaskList(nomeLista, idUsuario);

            // ESTILO PADRÃO - Nenhuma alteração aqui
            res.status(201).json({
                ok: true,
                mensagem: 'Lista criada com sucesso!',
                idLista: resultado.insertId,
                nomeLista: nomeLista
            });
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao criar Lista', detalhe: e.message });
        }
    }

    static async deletarList(req, res) {
        try {
            const { idLista } = req.body;
            await listModel.deleteTaskList(idLista); 

            res.status(200).json({
                ok: true,
                mensagem: 'Lista deletada com sucesso!'
            });
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao apagar lista', detalhe: e.message });
        }
    }

    static async atualizartaskList(req, res) {
        try {
            const { idLista, novoNomeLista } = req.body;
            await listModel.updateTaskList(idLista, novoNomeLista); 

            res.status(200).json({
                ok: true,
                mensagem: 'Lista atualizada com sucesso!',
                idLista: idLista,
                novoNomeLista: novoNomeLista
            });
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao atualizar lista', detalhe: e.message });
        }
    }

    static async queryLists(req, res) {
        try {
            const { idUsuario } = req.usuario.id;
            const listas = await listModel.listarTaskLists(idUsuario);

            res.status(200).json({ 
                ok: true,
                mensagem: 'Listas consultadas com sucesso!',
                listas: listas 
            });
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao consultar listas', detalhe: e.message });
        }
    }

    static async queryListsID(req, res) {
        try {
            const { idUsuario, idLista } = req.usuario.id;
            const lista = await listModel.listarTaskListPorId(idUsuario, idLista);

            res.status(200).json({
                ok: true,
                mensagem: 'Lista consultada com sucesso!',
                lista: lista
            });
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao consultar lista', detalhe: e.message });
        }
    }
}

module.exports = ListController;
