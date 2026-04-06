// Jefe Chef -> Maneja los requests y respuestas del servidor

import { Request, Response } from "express";
import { handleChat } from "../services/chatService";

// Middleware para manejar el endpoint de chat
export const chatController = (req: Request, res: Response) => {
  // Recibimos el mensaje del usuario desde el cuerpo de la petición
  const { message } = req.body;

  // Validamos que el mensaje sea una cadena de texto
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid message" });
  }

  // Guardamos en una constante response la respuesta del bot llamando a la función handleChat
  const response = handleChat(message);

  // Enviamos la respuesta del bot al cliente
  res.json({
    bot: response,
  });
};
