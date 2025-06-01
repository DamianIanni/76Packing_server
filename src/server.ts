import dotenv from "dotenv";
dotenv.config();

import express from "express";
import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
// import cors from "cors";
const cors = require("cors");

import { testConnection } from "./services/dbServices/testConnection";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

const app = express();
const PORT = process.env.PORT;

// 🔐 Carga condicional de credenciales de Firebase
let serviceAccount: ServiceAccount;

if (process.env.NODE_ENV === "production") {
  try {
    serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );
  } catch (error) {
    console.error("❌ Error al parsear FIREBASE_SERVICE_ACCOUNT_KEY:", error);
    process.exit(1);
  }
} else {
  serviceAccount = require("./firebaseServiceAccountKey.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(cors({ origin: "*" }));
app.use(express.json());

async function startServer() {
  await server.start();

  app.use("/graphql", async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
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
