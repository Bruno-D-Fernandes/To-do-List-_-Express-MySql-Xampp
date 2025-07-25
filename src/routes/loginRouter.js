const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', loginController.loginPage);           // GET /login/
router.post('/', loginController.login);              // POST /login

// Arrumar essa gambiarra aqui 

router.get('/cadastro', loginController.cadastroPage); // GET /login/cadastro
router.post('/cadastro', loginController.cadastrar);   // POST /login/cadastro

module.exports = router;