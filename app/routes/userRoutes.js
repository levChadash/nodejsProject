const express = require('express');
const { builtinModules } = require('module');
var router = express.Router();


const controller=require('../controllers/userController')

router.get('/:id',controller.getOneUser);
router.get('/',controller.getAllUsers);
router.get('/:email/:password',controller.logInUser);
router.post('/',controller.postUser);
router.put('/:id',controller.putUser);
router.delete('/:id',controller.deleteUser);


module.exports = router;


