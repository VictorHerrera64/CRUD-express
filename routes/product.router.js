const express = require("express");
const router = express.Router();
const productService = require('./../services/product.service');
const service = new productService();
const validatorHandler = require('./../middlewares/validator.handler');
const {createProductSchema,getProductSchema,updateProductSchema} = require('./../schemas/product.schema');


router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (err) {
    res.status(404).json({message:err.message})
  }
})

/**
 * router.get usando middleware valitador
 router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
 */

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body)
  res.status(201).json({
    message: 'created',
    data: newProduct,
  });
})

/**
 * router.post usando middleware valitador
 router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);
 */

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.updatePartial(id, body);
  res.status(200).json(product)
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.status(200).json(product)
})

/**
 *  router.put - Usando middleware validator
router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
 */

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.delete(id)
  res.status(200).json(product)
})

module.exports = router;


