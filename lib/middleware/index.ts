import boom from "@hapi/boom";
import express from 'express';
import type {
	Application,
	NextFunction, Request, Response,
} from 'express';
import cors from 'cors';

/**
 * This module contains express middleware.
 * Middleware authenicate any request comes to API.
 * Error Handlers middleware will intercept responses and send proper error codes to the client.
 */
export const registerErrorHandlers = (app: Application): void => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	app.use((req, res, next) => {
		console.warn('404: %s %s', req.method, req.url);
		const boomError = boom.notFound('resource not found');
		return res.status(boomError.output.statusCode)
			.send(boomError.output.payload);
	});

	// unhandled exceptions
	// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
	app.use((err: any, req: Request, res: Response, next: NextFunction) => {
		if (!err.isBoom) {
			err = boom.internal('Internal Server Error');
		}
		console.error(err);
		return res.status(err.output.statusCode)
		.send(err.output.payload);
	});
};

export const registerMiddleware = (app: Application): void => {
	// for API body parsing and cross-origin request support
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cors());

	// request logging
	app.use((req, res, next) => {
		console.info('%s %s', req.method, req.url);
		return next();
	});
};
