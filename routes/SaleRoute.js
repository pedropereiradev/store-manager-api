const express = require('express');

const saleController = require('../controllers/saleController');
const saleValidation = require('../middlewares/saleValidation');

const saleRoute = express.Router();

saleRoute.post('/', saleValidation.validateSale, saleController.create);

saleRoute.get('/', saleController.getAll);

saleRoute.get('/:id', saleController.getById);

saleRoute.delete('/:id', saleController.destroy);

module.exports = saleRoute;