const listController = require('../controllers/listController');
const autenticarToken = require('../middlewares/autenticarToken');
const express = require('express');
const router = express.Router();

router.get('/', listController.queryLists);
router.post('/', autenticarToken, listController.criarLista);
router.delete('/', listController.deletarList);
router.put('/', listController.atualizartaskList);

module.exports = router;