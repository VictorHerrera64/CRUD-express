const express = require('express');
const productsRouter = require('./product.router');

function routerApi(app) {
  // manejo version de Api
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
}

module.exports = routerApi;
