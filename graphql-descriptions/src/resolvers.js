const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type Person {
    name: String
  }

  type Query {
    people: [Person]
  }
`;

const resolvers = {
  Query: {
    people: {
      description: 'Query all the people',
      resolve: () => [{ name: 'Brian' }, { name: 'Dan' }],
    },
  },
  Person: {
    name: {
      description: 'The name of the person',
      resolve: _ => _.name,
    },
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
