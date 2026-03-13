const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'PrimeTrade Task API',
      version: '1.0.0',
      description: 'API for task management with JWT authentication',
      contact: {
        name: 'Backend Developer Intern',
      },
      servers: [
        {
          url: 'http://localhost:5000',
          description: 'Development server',
        },
      ],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Ensure the paths work on Windows by using path.join and then normalizing to forward slashes
  apis: [
    path.join(__dirname, '../routes/*.js').replace(/\\/g, '/'),
    path.join(__dirname, '../controllers/*.js').replace(/\\/g, '/')
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
