const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());


app.use('/graphql', graphqlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true,
}));

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@littledevcluster-o82sx.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true },
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
