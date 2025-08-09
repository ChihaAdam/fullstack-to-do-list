import swaggerJSDoc from 'swagger-jsdoc'
import { API_URL } from './config/env.js'

const serverUrl =API_URL || 'http://localhost:3000';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'Express API with Swagger docs',
    },
    servers: [
      {
        url: serverUrl,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
