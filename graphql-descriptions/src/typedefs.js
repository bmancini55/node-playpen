const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  # Individual human
  type Person {
    # Name of the human
    name: String
  }

  # Root query
  type Query {
    # All of the people
    people: [Person]
  }
`;

const resolvers = {
  Query: {
    people: () => [{ name: 'Brian' }, { name: 'Dan' }],
  },
  Person: {
    name: _ => _.name,
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3000);
