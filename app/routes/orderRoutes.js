var express = require('express');
var router = express.Router();
var orderController = require('../controllers/orderController.js');

/*
 * POST
 */
router.post('/', orderController.postOrder);

module.exports = router;
