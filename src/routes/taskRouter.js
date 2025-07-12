const taskController = require('../controllers/taskController')
const express = require('express')
const router = express.Router();


router.get('/',taskController.listTasks);
// router.post('/',taskController.createTask);
// router.delete('/',taskController.deleteTask);
// router.put('/',taskController.updateTask);

module.exports = router