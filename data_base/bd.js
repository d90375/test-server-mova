import mongoose from "mongoose";

import { MONGO_CONNECTION_URL } from "../src/config";

import moviesJSON from "./mock.json";
import { User } from "../src/models";

const users = moviesJSON.map(user => new User(user));
console.log(users);

mongoose.connect(MONGO_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const bd = mongoose.connection;

bd.on("error", console.error.bind(console, "connection error:"));

bd.once("open", () => {
  bd.dropDatabase();
  setTimeout(() => {
    users.forEach(user => user.save());
  }, 1000);
});

process.exit();
