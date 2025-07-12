const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/',userController.createAccount);
// router.post('/',userController.createAccount);
// router.delete('/',userController.createAccount);
// router.put('/',userController.createAccount);

module.exports = router;