const controllers = require('../controllers');
module.exports = function(app){
  app.get('/',controllers.productsList);
  app.get('/products/:id',controllers.getProduct);
  app.get('/products/:id/annualcost/:consumption',controllers.getProductAnnualConsumption);
  app.get('/:consumption',controllers.productsList);

}