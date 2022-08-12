const { expect } = require('chai');
const Sinon = require('sinon');

const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');

describe('Product Controller Tests', () => {
  describe('Get All products', () => {
    afterEach(() => {
      Sinon.restore();
    })
    describe('If OK', () => {
      it('Should return a full array with status code 200', async () => {
        const request = {};
        const response = {};

        response.status = Sinon.stub().returns(response);
        response.json = Sinon.stub().returns();

        const resultExecute = [{ id: 1, name: 'Martelo do Thor' }, { id: 2, name: 'Escudo do Capitão América' }];

        Sinon.stub(productService, 'getAll').resolves(resultExecute);

        await productController.getAll(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(resultExecute)).to.be.equal(true);
      });
    })
  });
  
  describe('Get products by id', () => {
    afterEach(() => {
      Sinon.restore();
    })
    describe('If product exists', () => {
      it('Should return an object with status code 200', async () => {
        const request = {};
        const response = {};

        response.status = Sinon.stub().returns(response);
        response.json = Sinon.stub().returns();

        request.params = 1;

        const resultExecute = { id: 1, name: 'Martelo do Thor' };

        Sinon.stub(productService, 'getById').resolves(resultExecute);

        await productController.getById(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(resultExecute)).to.be.equal(true);
      })
    })
    describe('If product don\'t exists', () => {
      it('Should return an object with error message and status code 404', async () => {
        const request = {};
        const response = {};

        response.status = Sinon.stub().returns(response);
        response.json = Sinon.stub().returns();

        request.params = 1;

        const resultExecute = {
          error: {
            code: 404,
            message: 'Product not found',
          },
        };

        Sinon.stub(productService, 'getById').resolves(resultExecute);

        await productController.getById(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith({message: 'Product not found'})).to.be.equal(true);
      })
    })
  });

  describe('Create a new product', () => {
    it('Should return an object and status code 201', async () => {
      const request = {};
      const response = {};

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();

      request.body = 'Manopla do Destino';

      const resultExecute = {
        id: 1,
        name: 'Manopla do Destino'
      };

      Sinon.stub(productService, 'create').resolves(resultExecute);

      await productController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith({id: 1, name: 'Manopla do Destino'})).to.be.equal(true);
    })
  })
})