const homeController = require('../controllers/homeController');
const autenticarToken = require('../middlewares/autenticarToken');
const express = require('express');
const router = express.Router();


router.get('/', homeController.homePage);
router.get('/home', autenticarToken, homeController.carregarListaTarefas);


module.exports = router;