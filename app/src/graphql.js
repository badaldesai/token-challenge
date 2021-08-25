import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

export const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache()
});

export const getTable = gql`
query table($query: Params) {
  table(query: $query) {
    table {
      First_Name
      Last_Name
      Country
      email
      dob
      mfa
      amt
      createdDate
      ReferredBy
    }
    count
    uniqueCountry
    uniqueMFA
  }
}
`;