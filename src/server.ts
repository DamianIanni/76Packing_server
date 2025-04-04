import express, { Request, Response } from "express";

const app = express();
const PORT = 3005;

app.get("/", (req: Request, res: Response) => {
  res.send("¡Hola, TypeScript con Node.js!");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
