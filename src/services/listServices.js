const listModel = require('../models/ListModel');

class ListServices {
    static async queryList(id) {
        try {
            const resultado = await listModel.listarTaskLists(id);
            return resultado;
        } catch (e) {
            console.error('Erro ao consultar listas', 'LIST SERVICES', e);
        }
    }
}

module.exports = ListServices
