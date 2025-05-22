// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Stand Expo',
      version: '1.0.0',
      description: 'API para el registro y seguimiento de visitantes en un stand de exposición',
    },
    servers: [
      {
        url: 'https://api-stand.onrender.com',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;