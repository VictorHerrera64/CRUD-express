const express = require("express");
const app = express()
const port = 3000;
const routerApi = require('./routes');
app.use(express.json()); //middleware de express que me permite recibir la información de POST 
const {logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

routerApi(app);
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

app.listen(port, () => {
  console.log("App running");
});
