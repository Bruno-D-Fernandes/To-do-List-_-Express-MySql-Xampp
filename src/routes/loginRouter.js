const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', loginController.loginPage);
router.post('/login', loginController.login);

router.get('/cadastro', loginController.cadastroPage);
router.post('/cadastro', loginController.cadastrar);

module.exports = router;