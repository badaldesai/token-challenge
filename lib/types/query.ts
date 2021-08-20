type Sort = {
    field: string;
    ascending: boolean;
}

type Filter = {
    field: string;
    value: string;
}

export type Query = {
    offset?: number;
    limit?: number;
    sort?: Sort;
    filters?: Filter[];
    search?: string;
}