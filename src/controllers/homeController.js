const ListServices = require('../services/listServices');

exports.homePage = (req, res) => {
    res.render('home');
};

module.exports.carregarListaTarefas = async (req, res) => {
    try {
        const {id, email, nome} = req.usuario;
        const listaTarefas = await ListServices.queryList(id);

        console.log(listaTarefas);
        res.status(200).json(listaTarefas);
    } catch (e) {
        console.error('Erro ao carregar lista de tarefas: ', e);
        res.status(500).json({ erro: 'Erro ao carregar lista de tarefas', detalhe: e.message });
    }
}