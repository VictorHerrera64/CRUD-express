const boom = require('@hapi/boom');

// middleware dinamico
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property]; //body , params , query
    const { error } = schema.validate(data, { abortEarly: false }); // brinde todos los errores
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
