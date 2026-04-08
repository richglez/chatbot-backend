// Mesero -> server / rutas

import express from "express";
import chatRoutes from "./routes/chatRoutes";

const app = express();
const PORT = 3000;

// Permitir que mi app entienda JSON en el cuerpo de las peticiones
app.use(express.json());

// routes
app.use("/api", chatRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Chatbot funcionando 🚀");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
