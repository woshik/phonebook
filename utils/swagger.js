module.exports = {
  swaggerDefinition: {
    info: {
      title: 'Phonebook API',
      description: 'Express server phonebook API documentation',
      version: '1.0.0',
    },
    basePath: '/api/v1',
  },
  apis: ['application/controller/*.js'],
};
