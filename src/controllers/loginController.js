require('dotenv').config(); 
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');


// Login de usuário

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.login = async (req, res) => {
    const { email, senha } = req.body;
    const [ user ] = await UserModel.getUserByEmail(email);

    // console.log({ email, senha })
    // console.log(user);

    if (user && user.senhaUsuario == senha) {
        delete user.senha;
        const payload = { 
            id: user.idUsuario, 
            email: user.emailUsuario, 
            nome: user.nomeUsuario };

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });


        res.json({mensagem: 'Login realizado com sucesso', token});
    } else {
        return res.status(400).json({ erro: 'Email ou senha inválidos'});
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