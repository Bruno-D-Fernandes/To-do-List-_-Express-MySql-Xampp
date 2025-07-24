const taskController = require('../controllers/taskController')
const express = require('express')
const router = express.Router();


router.get('/',taskController.queryLists);
// router.post('/',taskController.criarTarefa);
// router.delete('/',taskController.deletaTarefa);
// router.put('/',taskController.atualizarTarefa);

module.exports = router