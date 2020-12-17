const mongoose = require("mongoose");

const { MONGO_CONNECTION_URL } = require("./common");

const Movie = require("./models/movie");
const moviesJSON = require("./mock.json");

const movies = moviesJSON.map(movie => new Movie(movie));

mongoose.connect(MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  db.dropDatabase();
  setTimeout(() => {
    movies.forEach(movie => movie.save());
  }, 1000);
});

process.exit(1);
