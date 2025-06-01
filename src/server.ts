import dotenv from "dotenv";
dotenv.config();
// import fs from "fs";
// import path from "path";

import express from "express";
import admin from "firebase-admin";
// import { ServiceAccount } from "firebase-admin";
// import serviceAccount from "./firebaseServiceAccountKey.json";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
// import cors from "cors";
const cors = require("cors");

import { testConnection } from "./services/dbServices/testConnection";

import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

import fs from "fs";
import path from "path";
import { ServiceAccount } from "firebase-admin";

let serviceAccount: ServiceAccount;

try {
  const secretPath = "/run/secrets/FIREBASE_SERVICE_ACCOUNT_KEY";
  console.log("📂 Verificando existencia de:", secretPath);
  console.log("🧾 Archivos en /run/secrets/:", fs.readdirSync("/run/secrets/"));
  if (fs.existsSync(secretPath)) {
    console.log("✅ Usando secret file de Render");
    const fileContent = fs.readFileSync(secretPath, "utf8");
    serviceAccount = JSON.parse(fileContent);
  } else {
    console.log("🛠️ Usando archivo local firebaseServiceAccountKey.json");
    const localPath = path.resolve(
      __dirname,
      "./firebaseServiceAccountKey.json"
    );
    serviceAccount = JSON.parse(fs.readFileSync(localPath, "utf8"));
  }
} catch (err) {
  console.error("❌ Error cargando el archivo de Firebase:", err);
  process.exit(1);
}

// console.log("🔑 OR_API_KEY:", process.env.OR_API_KEY);
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
  // app.use("/graphql", async (req, res, next) => {
  //   const authHeader = req.headers.authorization;

  //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //     return res.status(401).json({ error: "No autorizado" });
  //   }

  //   const idToken = authHeader.split("Bearer ")[1];

  //   // const mocked_token =
  //   //   "eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxMTE1MjM1YTZjNjE0NTRlZmRlZGM0NWE3N2U0MzUxMzY3ZWViZTAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRGFtaWFuIElhbm5pIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0picnVfb0RoaWJrZTdXWWZEYXZaYWcxQldqVnlSOUk3UnltYXB5Z0Q5bGgwVGNoUm56PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3BhY2tpbmc3Ni1jNTkyNSIsImF1ZCI6InBhY2tpbmc3Ni1jNTkyNSIsImF1dGhfdGltZSI6MTc0NDEyOTUxMCwidXNlcl9pZCI6Ik5wMTdGdUlyMVJReXhaSzFnSDJ1TDVvcHAwZTIiLCJzdWIiOiJOcDE3RnVJcjFSUXl4WksxZ0gydUw1b3BwMGUyIiwiaWF0IjoxNzQ0MTI5NTY3LCJleHAiOjE3NDQxMzMxNjcsImVtYWlsIjoiZGFtaWFuZ3Vzc2lAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDM1OTE4MDM2NzU2MTU3NjExMzAiXSwiZW1haWwiOlsiZGFtaWFuZ3Vzc2lAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.qpQI1N0DojgysBRgkqSeXjvOXMYjBQvw77u2XTTsk-bhI6428cQ3nZy7f3n4d-lm8lIWp01O4RX6ePFTmUkMHB5qUNh1N2mNaLL7O7EDoy9tuwfYlxB-Y2Pixyyq6KxLjf2j0ysQPGh_KHU0giv2ZkunrAQ2FVXLC1QvonL09K6gjEXr43yHEqjuzlCUbC63ecJKhcSUJYi88-JCZE5_7HxMMsvY_MtvAtoDA5P6ggF0zzvoegQ_lwcHfU7VIP1VetDepIx-n5wlUcXbQkqQhXZk7iKO_NFarEN7T-ceV9qRSFatpMPrKfh47sOwS_oE0PPHF3898o2PS9Kd55Uekw";
  //   // try {
  //   //   const decodedToken = await admin.auth().verifyIdToken(mocked_token);
  //   //   (req as any).user = decodedToken;
  //   //   next();
  //   // } catch (error) {
  //   //   return res.status(401).json({ error: "Token inválido" });
  //   // }

  //   try {
  //     const decodedToken = await admin.auth().verifyIdToken(idToken);
  //     console.log("✅ Token válido:", decodedToken);
  //     (req as any).user = decodedToken;
  //     next();
  //   } catch (error) {
  //     console.error("❌ Error al verificar el token:", error);
  //     return res.status(401).json({ error: "Token inválido" });
  //   }
  // });
  await testConnection();
  app.use("/graphql", expressMiddleware(server));
  app.listen(PORT, () => {
    console.log(
      `🚀 Servidor GraphQL corriendo en http://localhost:${PORT}/graphql`
    );
  });
}

startServer();
