import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

console.log("🔑 OR_API_KEY:", process.env.OR_API_KEY);
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(PORT, () => {
    console.log(
      `🚀 Servidor GraphQL corriendo en http://localhost:${PORT}/graphql`
    );
  });
}

startServer();
