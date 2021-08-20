import { Application } from 'express';
import graphql from './grapghQL';

export default (app: Application): void => {
	if (!app) {
		throw new Error('app context is required to initialize routes');
	}
	// register all resources
	graphql(app);
};