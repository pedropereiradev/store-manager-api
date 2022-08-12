const { expect } = require('chai');
const Sinon = require('sinon');

const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

describe('Product Service Tests', () => {
  describe('Get All products', () => {
    describe('If OK', () => {
      afterEach(() => {
        Sinon.restore();
      })
    
      it('Should return an Array', async () => {
        const resultExecute = [];

        Sinon.stub(productModel, 'getAll').resolves(resultExecute);

        const result = await productService.getAll();

        expect(result).to.be.an('array');
      });
    
      it('Should return an empty array', async () => {
        const resultExecute = [];

        Sinon.stub(productModel, 'getAll').resolves(resultExecute);

        const result = await productService.getAll();

        expect(result).to.be.empty;
      });
    
      it('Should return a full array', async () => {
        const resultExecute = [{ id: 1, name: 'Martelo do Thor' }, { id: 2, name: 'Escudo do Capitão América' }];

        Sinon.stub(productModel, 'getAll').resolves(resultExecute);

        const result = await productService.getAll();

        expect(result).to.be.not.empty;
      });
    
      it('Should return an Array with objects', async () => {
        const resultExecute = [{ id: 1, name: 'Martelo do Thor' }];

        Sinon.stub(productModel, 'getAll').resolves(resultExecute);

        const [result] = await productService.getAll();

        expect(result).to.be.an('object');
      });

      it('Should return an Array with object with \'id\' and \'name\' keys', async () => {
        const resultExecute = [{ id: 1, name: 'Martelo do Thor' }];

        Sinon.stub(productModel, 'getAll').resolves(resultExecute);

        const [result] = await productService.getAll();

        expect(result).to.all.keys('id', 'name');
      });
    })
  })

  describe('Get product by ID', () => {
    afterEach(() => {
      Sinon.restore();
    })
    describe('If product exists', () => {
      it('Should return an object', async () => {
        const resultExecute = { id: 1, name: 'Martelo do Thor' };
        
        Sinon.stub(productModel, 'getById').resolves(resultExecute);

        const result = await productService.getById(1);

        expect(result).to.be.an('object');
      });
      it('Should not return null', async () => {
        const resultExecute = { id: 1, name: 'Martelo do Thor' };
        
        Sinon.stub(productModel, 'getById').resolves(resultExecute);

        const result = await productService.getById(1);

        expect(result).to.not.be.null;
      });
      it('Should return an object with id and name keys', async () => {
        const resultExecute = { id: 1, name: 'Martelo do Thor' };
        
        Sinon.stub(productModel, 'getById').resolves(resultExecute);

        const result = await productService.getById(1);

        expect(result).to.all.keys('id', 'name');
      });
    })
    describe('If product don\'t exists ', () => {
      it('Should return an object', async () => {
        const resultExecute = null;
        
        Sinon.stub(productModel, 'getById').resolves(resultExecute);

        const result = await productService.getById(10);

        expect(result).to.be.an('object');
      });
      it('Should return an object with error key', async () => {
        const resultExecute = null;
        
        Sinon.stub(productModel, 'getById').resolves(resultExecute);

        const result = await productService.getById(10);

        expect(result).to.all.keys('error');
      });

      it('Should return an object with error key with \'code\' and \'message\' keys', async () => {
        const resultExecute = null;
        
        Sinon.stub(productModel, 'getById').resolves(resultExecute);

        const result = await productService.getById(10);

        expect(result.error).to.all.keys('code', 'message');
      });

      it('Should return a number on \'error.code\'', async () => {
        const resultExecute = null;

        Sinon.stub(productModel, 'getById').resolves(resultExecute);

        const result = await productService.getById(2);

        expect(result.error.code).to.be.a('number');
      })

      it('Should return a string on \'error.message\'', async () => {
        const resultExecute = null;

        Sinon.stub(productModel, 'getById').resolves(resultExecute);

        const result = await productService.getById(2);

        expect(result.error.message).to.be.a('string');
      })
    })
  })

  describe('Create a new product', () => {
     afterEach(() => {
      Sinon.restore();
    })
    it('Should return an object', async () => {
       const resultExecute = { id: 1, name: 'Manopla do Destino' };

      Sinon.stub(productModel, 'create').resolves(resultExecute)

      const result = await productService.create('Manopla do Destino');

      expect(result).to.be.an('object');
    })

    it('Should have id and name keys', async () => {
       const resultExecute = { id: 1, name: 'Manopla do Destino' };

      Sinon.stub(productModel, 'create').resolves(resultExecute)

      const result = await productService.create('Manopla do Destino');

      expect(result).to.all.keys('id', 'name');
    })
  })
})