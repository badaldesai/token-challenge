import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import expressPlayground from 'graphql-playground-middleware-express';

import typeDefs from '../graphql/schemas';
import resolvers from '../graphql/resolvers';

export default function (app: Application): void {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});
	server.applyMiddleware({ app });
	app.get(
		'/playground',
		expressPlayground({
			endpoint: '/graphql',
		}),
	);
}
