const express = require("express");
const mongoose = require("mongoose");
const schema = require("./schema");
const bodyParser = require("body-parser");
const cors = require("cors");

const { ApolloServer } = require("apollo-server-express");

const { MONGO_CONNECTION_URL } = require("./common");

console.log(MONGO_CONNECTION_URL);

const connect = mongoose.connect(MONGO_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then(
  db => {
    console.log("Connected correctly to server!");
  },
  err => {
    console.log(err);
  }
);

const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers
});

const app = express();

app.use(bodyParser.json());
app.use("*", cors());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
