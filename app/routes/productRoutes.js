var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController.js');

/*
 * GET
 */
router.get('/', productController.getAllProducts);

/*
 * GET
 */
router.get('/category', productController.getByCategoriesId);

/*
 * POST
 */
router.post('/', productController.postProduct);

module.exports = router;
