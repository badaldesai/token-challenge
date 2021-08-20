export const types = `
  type Table {
    First_Name: String
    Last_Name: String
    Country: String
    email: String
    dob: String
    mfa: String
    amt: Int
    createdDate: String
    ReferredBy: String
  }
  input Sort {
    field: String
    ascending: Boolean
  }
  input Filter {
    field: String
    value: String
  }
  input Params {
    offset: Int
    limit: Int
    sort: Sort
    filters: [Filter]
    search: String
  }
`;

export const queries = `
  table(query: Params): [Table]
`;
