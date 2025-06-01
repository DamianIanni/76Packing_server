import dotenv from "dotenv";
dotenv.config();

import express from "express";
import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import serviceAccount from "./firebaseServiceAccountKey.json";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

import { testConnection } from "./services/dbServices/testConnection";

import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

const app = express();
const PORT = process.env.PORT;
const castedServiceAccount = serviceAccount as ServiceAccount;
app.use(cors({ origin: "*" }));
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(castedServiceAccount),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  // app.use((req, res, next) => {
  //   console.log(`${req.method} ${req.url}`);
  //   console.log("Headers:", req.headers);
  //   console.log("Body:", req.body);
  //   next();
  // });

  app.use("/graphql", async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      // console.log("✅ Token válido:", decodedToken);
      (req as any).user = decodedToken;
      next();
    } catch (error) {
      console.error("❌ Error al verificar el token:", error);
      return res.status(401).json({ error: "Token inválido" });
    }
  });
  await testConnection();
  app.use("/graphql", expressMiddleware(server));
  app.listen(PORT, () => {
    console.log(
      `🚀 Servidor GraphQL corriendo en http://localhost:${PORT}/graphql`
    );
  });
}

startServer();
