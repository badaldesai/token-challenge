# token-challenge
Ledn Token Challenge
This involves Graphql server and React app.

# Minimum Requirement
Node version 12.0 and above install.

# Start the server

The graphql-express runs on the port on 8080 if there is no port number provided as env variable.
To install the dependencies, you can run:
```
npm install
```
To start graphql server, you can run:
```
npm run start-server
```

Sample curl command to get table info is here:
```
curl --location --request POST 'http://localhost:8080/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query table($query: Params) {\n    table(query: $query) {\n        table {\n            First_Name\n            Last_Name\n            Country\n        email\n        dob\n        mfa\n        amt\n        createdDate\n        ReferredBy\n    }\n    count\n    }\n}","variables":{"query":{"sort":{"field":"createdDate","ascending":true}}}}'
```

# Start the app

Make sure server is started before starting the app.
The react app runs on the port on 3000 if there is no port number provided.
To install the dependencies, you can run:
```
cd app
npm install
```
To start the react app, you can run from the root directory:
```
npm run start-app
```

The link to access the app is http://localhost:3000/
