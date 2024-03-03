const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const PORT = process.env.PORT;

const app = express();

// Middleware untuk mengizinkan CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Atur asal permintaan sesuai kebutuhan Anda
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });

  app.get("/", (req, res) => res.send("Data Layer"));

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}${server.graphqlPath}`);
  });
}

startApolloServer(typeDefs, resolvers);

module.exports = app;
