const { expect } = require('chai');
const Sinon = require('sinon');

const saleService = require('../../../services/saleService');
const saleController = require('../../../controllers/saleController');

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

describe('Sale Controller Tests', () => {
  describe('Create a new sale', () => {
    afterEach(() => {
      Sinon.restore();
    });

    it('Should return an object and status code 201', async () => {
      const request = {};
      const response = {};

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();

      request.body = requestData;

      Sinon.stub(saleService, 'create').resolves(resultExecute);

      await saleController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(resultExecute)).to.be.equal(true);
    });

    it('Should return an error object and status code 404', async () => {
      const request = {};
      const response = {};

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();

      request.body = requestData;

      Sinon.stub(saleService, 'create').resolves(resultErrorExecute);

      await saleController.create(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({message: 'Product not found'})).to.be.equal(true);
    });
  });
});
