const { expect } = require('chai');
const Sinon = require('sinon');

const saleProductModel = require('../../../models/saleProductModel');
const saleService = require('../../../services/saleService');

const resultExecute = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity:1
    },
    {
      productId: 2,
      quantity:5
    }
  ]
};

const resultErrorExecute = { error: { code: 404, message: 'Product not found' } };
      
const requestData = [
  {
    productId: 1,
    quantity:1
  },
  {
    productId: 2,
    quantity:5
  }
]

describe('Sale Service Tests', () => {
  describe('Create a new product', () => {
    afterEach(() => {
      Sinon.restore();
    });
   
    it('Should return an object', async () => {
      Sinon.stub(saleProductModel, 'create').resolves(resultExecute)

      const result = await saleService.create(requestData);

      expect(result).to.be.an('object');
    });

    it('Should have id and itemsSold keys', async () => {
      Sinon.stub(saleProductModel, 'create').resolves(resultExecute)

      const result = await saleService.create(requestData);

      expect(result).to.all.keys('id', 'itemsSold');
    });
     
    it('Should return an object with error key', async () => {
      Sinon.stub(saleService, 'create').resolves(resultErrorExecute);

      const result = await saleService.create(requestData);

      expect(result).to.all.keys('error');
    });

    it('Should return an object with error key with \'code\' and \'message\' keys', async () => {
      Sinon.stub(saleService, 'create').resolves(resultErrorExecute);

      const result = await saleService.create(requestData);

      expect(result.error).to.all.keys('code', 'message');
    });

    it('Should return a number on \'error.code\'', async () => {
      Sinon.stub(saleService, 'create').resolves(resultErrorExecute);

      const result = await saleService.create(requestData);

      expect(result.error.code).to.be.a('number');
    });

    it('Should return a string on \'error.message\'', async () => {
      Sinon.stub(saleService, 'create').resolves(resultErrorExecute);

      const result = await saleService.create(requestData);

      expect(result.error.message).to.be.a('string');
    });
  });
});
