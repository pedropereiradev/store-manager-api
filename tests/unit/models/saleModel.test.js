const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../models/connection');
const saleModel = require('../../../models/saleModel');

describe('Sale Model Tests', () => {
  describe('Create a new Sale', () => {
    afterEach(() => {
      Sinon.restore();
    })
    it('Should return an object', async () => {
      const resultExecute = [{ id: 1 }];

      Sinon.stub(connection, 'execute').resolves([resultExecute])

      const result = await saleModel.create();

      expect(result).to.be.an('object');
    });
    it('Should have an id key', async () => {
      const resultExecute = [{ id: 1 }];

      Sinon.stub(connection, 'execute').resolves([resultExecute])

      const result = await saleModel.create();

      expect(result).to.all.keys('id');
    });
  })
})