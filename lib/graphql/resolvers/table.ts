import { fetchTable } from '../../modules/report';
import { Query } from '../../types/query';
import { Result } from '../../types/report';

type ArgsQuery = {
	query: Query
}

const table = (
	_p: undefined,
	_args: ArgsQuery,
): Result => {
	const { query } = _args;
	return fetchTable(query);
};

export const tableQueries = {
	table
};
