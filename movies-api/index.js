const express = require('express');
const app = express();
const { config } = require('./config/index');
const moviesApi = require('./routes/movies');

//importar middleware
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler')

//body parser
app.use(express.json());
moviesApi(app);

//capturar error 404
app.use(notFoundHandler);

//estos middleware deben ir mas abajo de la linea de l implementación de las ruta
//estos son los manejadores de errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`listenight http://localhost:${config.port}`);
});

