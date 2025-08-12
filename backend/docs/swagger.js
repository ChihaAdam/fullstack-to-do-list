import usersDocs from './users.route.json' with { type: 'json' };
import todosDocs from './todo.route.json' with { type: 'json' };
import refreshDocs from './refresh.route.json' with { type: 'json' };
const paths = {
  ...usersDocs.paths,
  ...todosDocs.paths,
  ...refreshDocs.paths,
};

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Fullstack To-Do List API',
    version: '1.0.0',
    description: 'API documentation for the Fullstack To-Do List application',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
  paths,
};

export { swaggerSpec };