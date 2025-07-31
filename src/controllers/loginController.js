require('dotenv').config();
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

// --- Login de usuário ---

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const [user] = await UserModel.getUserByEmail(email);

        if (!user || user.senhaUsuario !== senha) {
            return res.status(401).json({ erro: 'Email ou senha inválidos' });
        }

        const payload = {
            id: user.idUsuario,
            email: user.emailUsuario,
            nome: user.nomeUsuario
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ 
            ok: true,
            mensagem: 'Login realizado com sucesso',
            token
        });

    } catch (error) {
        res.status(500).json({ erro: 'Ocorreu um erro interno no servidor.', detalhe: error.message });
    }
};

// --- Cadastro de usuário ---

exports.cadastroPage = (req, res) => {
    res.render('cadastro');
};

exports.cadastrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const [existingUser] = await UserModel.getUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({ erro: 'Email já cadastrado' });
        }

        const result = await UserModel.createUser(nome, email, senha);
        res.status(201).json({
            ok: true,
            mensagem: 'Usuário cadastrado com sucesso',
            idUsuario: result.insertId
        });

    } catch (error) {
        res.status(500).json({ erro: 'Ocorreu um erro interno ao cadastrar o usuário.', detalhe: error.message });
    }
};
