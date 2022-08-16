const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../models/connection');
const saleProductModel = require('../../../models/saleProductModel');

describe('Sale Product Model Tests', () => {
  describe('Create a new Sale', () => {
    afterEach(() => {
      Sinon.restore();
    })
    it('Should call the create function', async () => {
      const data = {
        saleId: 1,
        productId: 2,
        quantity: 1
      };

      Sinon.stub(connection, 'execute');
      
      const result = await saleProductModel.create({ saleId: data.saleId, productId: data.productId, quantity: data.quantity });
      
      expect(result).to.be.equal(true);
    });
  })
})