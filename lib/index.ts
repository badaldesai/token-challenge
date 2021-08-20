import express from "express";
import { Application } from 'express';

import { registerErrorHandlers, registerMiddleware } from './middleware';
import routes from './routes';

const PORT = process.env.PORT || 8080;

function setupResources(app: Application) {
	console.info('loading resources');
	registerMiddleware(app);
	routes(app);
	registerErrorHandlers(app);
}

async function startServer(app: Application) {
	setupResources(app);

	app.listen(PORT);
	console.info(`server started on ${PORT}`);
}

startServer(express()).catch((err) => {
	if (err) {
		console.error(err.stack);
		process.exit(1);
	}
});
