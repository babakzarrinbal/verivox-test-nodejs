var productlist = require('../controllers').productsList;
var expect = require('chai').expect;

describe('#productlist()', function() {

  context('without arguments', function() {
    let result;
    result = productlist({query:{},params:{}},{json:r=>r.data});
    it('should return Products without params', function() {
      expect(result).to.be.an('array');
    })

    result = productlist({query:{},params:{consumption:3500}},{json:r=>r.data});
    it('should return Products with costs', function() {
      expect(result[0].annualCost).to.be.an('number');
    })
  })
  
  
})