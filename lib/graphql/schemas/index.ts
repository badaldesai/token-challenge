import { gql } from 'apollo-server-express';

import { queries as tableQueries, types as tableTypes } from './table';
const types = `
  ${tableTypes}
`;

const queries = `
	type Query {
		${tableQueries}
	}
`;

const typeDefs = gql(`${types} ${queries}`);

export default typeDefs;
