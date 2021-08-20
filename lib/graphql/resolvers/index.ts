import { tableQueries } from './table';
const resolvers = {
	Query: {
		...tableQueries,
	},
};

export default resolvers;
