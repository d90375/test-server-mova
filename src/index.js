import { error, success } from "consola";
import mongoose from "mongoose";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import * as AppModels from "./models";
import { PORT, IN_PROD, MONGO_CONNECTION_URL } from "./config";

// Initialize the Express application
const app = express();
app.use(AuthMiddleware);

import { typeDefs, resolvers } from "./graphql";
import AuthMiddleware from "./middlewares/auth";
import { schemaDirectives } from "./graphql/directives";

// playground - access to graphql on production mode
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  playground: IN_PROD,
  context: ({ req }) => {
    let { isAuth, user } = req;
    return {
      req,
      isAuth,
      user,
      ...AppModels
    };
  }
});

const startApp = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    success({
      badge: true,
      message: `Successfully connected with database.`
    });

    // Inject Apollo server middleware on Express Application
    server.applyMiddleware({ app });
    app.listen(PORT, () =>
      success({
        badge: true,
        message: `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      })
    );
  } catch (err) {
    error({
      badge: true,
      message: err.message
    });
  }
};

startApp();
