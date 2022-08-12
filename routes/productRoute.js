const express = require('express');

const productController = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation');

const productRoute = express.Router();

productRoute.get('/', productController.getAll);

productRoute.get('/:id', productController.getById);

productRoute.post('/', productValidation.validateName, productController.create);

module.exports = productRoute;
