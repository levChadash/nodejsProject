var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController.js');

/*
 * GET
 */
router.get('/', categoryController.getAllCategories);

/*
 * GET
 */
router.get('/:id', categoryController.getOneCategory);

/*
 * POST
 */
router.post('/', categoryController.postCategory);


module.exports = router;
