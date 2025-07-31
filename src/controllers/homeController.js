const ListServices = require('../services/listServices');

exports.homePage = (req, res) => {
    res.render('home');
};

module.exports.carregarListaTarefas = async (req, res) => {
    try {
        const idUsuario = req.usuario.id;
        const listaTarefas = await ListServices.queryList(idUsuario);

        res.status(200).json({
            ok: true,
            mensagem: 'Lista de tarefas carregada com sucesso.',
            data: listaTarefas
        });
    } catch (e) {
        console.error('Erro ao carregar lista de tarefas: ', e);
        res.status(500).json({
            ok: false,
            erro: 'Erro ao carregar lista de tarefas',
            detalhe: e.message
        });
    }
};
