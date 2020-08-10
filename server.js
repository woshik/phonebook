const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const logger = require('./utils/serverErrorLogger');
const { connectWithMogodb } = require('./database/connection');

// API documentation
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOption = require('./utils/swagger');

const server = express();

// server exception handling
process.on('uncaughtException', (error) => {
  logger.error({
    label: 'uncaughtException',
    message: error,
  });

  process.exit(1);
});

// server rejection handling
process.on('unhandledRejection', (error) => {
  logger.error({
    label: 'unhandledRejection',
    message: error,
  });

  process.exit(1);
});

// important middlewares
server
  // enable cors for server, Access-Control-Allow-Origin: *
  .use(cors())
  // secure the server with HTTP headers
  .use(helmet())
  .use(express.json())
  .use(
    express.urlencoded({
      extended: true,
    })
  );

// api route mapping
server.use('/api/v1', require('./routes/urlConfig')(require('./routes/api'), __dirname));

// api documentation route and documentation setup
server.use(
  '/api/v1/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerOption), {
    explorer: false,
    customCss: '.swagger-ui .topbar, .scheme-container { display: none !important }',
  })
);

// 404 api not found route
server.use(function (req, res, next) {
  res.status(404).json({
    status: 404,
    message: 'route not found',
  });
});

// server error handling
server.use((error, req, res, next) => {
  logger.error({ label: 'server error', message: error });

  res.status(500).json({
    status: 500,
    message: 'Server Error, Please try again later',
  });
});

connectWithMogodb(() => {
  logger.info('database connected');
});

module.exports = server;
