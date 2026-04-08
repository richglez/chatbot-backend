// Capitán de Meseros ?-> Su intencion es poder responder al cliente

import { Request, Response } from "express";
import { handleChat } from "@/services/chatService";
import { v4 as uuidv4 } from "uuid";

// Middleware para manejar el endpoint de chat
export const chatController = (req: Request, res: Response) => {
  // Recibimos el mensaje del usuario desde el cuerpo de la petición
  let { userId, message } = req.body;

  // Validamos que el mensaje sea una cadena de texto
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid message" });
  }

  // ✨ Si no viene userId, generamos uno nuevo automáticamente
  if (!userId) {
    userId = uuidv4();
  }

  // Validamos que el userId sea una cadena de texto
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "Invalid userId" });
  }

  // Guardamos en una constante response la respuesta del bot llamando a la función handleChat
  const response = handleChat(userId, message);

  // Enviamos la respuesta del bot al cliente
  res.json({
    ...response,
    userId: userId, // Devolvemos el userId para que el cliente lo pueda usar en futuras interacciones
  });
};;
