const UserModel = require('../models/userModel');

// Login de usuário

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.login = async (req, res) => {
    const { email, senha } = req.body;
    const user = await UserModel.getUserByEmail(email);
    if (user && user.senha === senha) {
        // sessão/cookie
        res.redirect('/tarefas');
    } else {
        return res.status(400).json({ erro: 'Email ou senha inválidos' });
    }
};

// Cadastro de usuário

exports.cadastroPage = (req, res) => {
    res.render('cadastro');
};

exports.cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body;
    const [user] = await UserModel.getUserByEmail(email);
    if (user) {
        return res.status(400).json({ erro: 'Email já cadastrado' });
    } else {
        await UserModel.createUser(nome, email, senha);
        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
    }
};