import { Query } from "../types/query";
import { Table } from "../types/report";
import dataJson from '../data/accounts.json';

export const fetchTable = (query: Query): Table[] => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any[] = dataJson;
    const offset = query.offset ? query.offset : 0;
    const limit = query.limit ? query.limit: 20;
    if (query.filters) {
        query.filters.forEach((filter) => {
            result = result.filter((data) => {
                if (data[filter.field] === filter.value) {
                    return true;
                }
                return false;
            });
        });
    }
    if (query.sort) {
        const { field, ascending } = query.sort;
        let isDate = false;
        if (field === 'createdDate' || field === 'dob') {
            isDate = true;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result.sort((a: any, b: any) => {
            if (isDate) {
                return ascending
                    ? new Date(a[field]).valueOf() - new Date(b[field]).valueOf()
                    : new Date(b[field]).valueOf() - new Date(a[field]).valueOf()
            }
            return ascending
                ? a[field] - b[field]
                : b[field] - a[field]
        });
    }
    if (query.search) {
        const regexPattern = new RegExp(query.search, 'i');
        result = result.filter((data) => {
            if (
                regexPattern.test(data.First_Name)
                || regexPattern.test(data.Last_Name)
            ) {
                return true;
            }
            return false;
        });
    }
    return result.slice(offset, limit);
}