
const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../models/connection');
const productModel = require('../../../models/productModel');

describe('Product Model Tests', () => {
  describe('Get All products', () => {
    describe('If OK', () => {
      afterEach(() => {
      Sinon.restore();
      })
      
      it('Should return an Array', async () => {
        const resultExecute = [];

        Sinon.stub(connection, 'execute').resolves([resultExecute]);

        const result = await productModel.getAll();

        expect(result).to.be.an('array');
      });
      
      it('Should return an empty array', async () => {
        const resultExecute = [];

        Sinon.stub(connection, 'execute').resolves([resultExecute]);

        const result = await productModel.getAll();

        expect(result).to.be.empty;
      });
      
      it('Should return a full array', async () => {
        const resultExecute = [{id: 1, name: 'Martelo do Thor'}, {id: 2, name: 'Escudo do Capitão América'}];

        Sinon.stub(connection, 'execute').resolves([resultExecute]);

        const result = await productModel.getAll();

        expect(result).to.be.not.empty;
      });
      
      it('Should return an Array with objects', async () => {
        const resultExecute = [{id: 1, name: 'Martelo do Thor'}];

        Sinon.stub(connection, 'execute').resolves([resultExecute]);

        const [result] = await productModel.getAll();

        expect(result).to.be.an('object');
      });

      it('Should return an Array with object with \'id\' and \'name\' keys', async () => {
        const resultExecute = [{id: 1, name: 'Martelo do Thor'}];

        Sinon.stub(connection, 'execute').resolves([resultExecute]);

        const [result] = await productModel.getAll();

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
        const resultExecute = [{ id: 1, name: 'Martelo do Thor' }];
        
        Sinon.stub(connection, 'execute').resolves([resultExecute]);

        const result = await productModel.getById(1);

        expect(result).to.be.an('object');
      });
      it('Should not return null', async () => {
        const resultExecute = [{ id: 1, name: 'Martelo do Thor' }];
        
        Sinon.stub(connection, 'execute').resolves([resultExecute]);

        const result = await productModel.getById(1);

        expect(result).to.not.be.null;
      });
      it('Should return an object with id and name keys', async () => {
        const resultExecute = [{ id: 1, name: 'Martelo do Thor' }];
        
        Sinon.stub(connection, 'execute').resolves([resultExecute]);

        const result = await productModel.getById(1);

        expect(result).to.all.keys('id', 'name');
      });
    })
    describe('If product don\'t exists ', () => {
      it('Should return null', async () => {
        const resultExecute = [];
        
        Sinon.stub(connection, 'execute').resolves([resultExecute]);

        const result = await productModel.getById(5);

        expect(result).to.be.null;
      });
      it('Should not return an object', async () => {
        const resultExecute = [];
        
        Sinon.stub(connection, 'execute').resolves([resultExecute]);

        const result = await productModel.getById(10);

        expect(result).to.not.be.an('object');
      });
    })
  })
})