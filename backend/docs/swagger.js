
import fs from 'fs';

// Load route docs
const usersDocs = JSON.parse(fs.readFileSync('./docs/users.route.json'));
const todosDocs = JSON.parse(fs.readFileSync('./docs/todo.route.json'));
const refreshDocs = JSON.parse(fs.readFileSync('./docs/refresh.route.json'));

// Merge all paths
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
