// Mesero -> server / rutas

import express from "express";
import { chatController } from "./controllers/chatController";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Chatbot funcionando 🚀");
});

app.post("/chat", chatController);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
