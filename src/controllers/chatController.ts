// Jefe Chef -> Maneja los requests y respuestas del servidor

import { Request, Response } from "express";
import { handleChat } from "../services/chatService";

export const chatController = (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const response = handleChat(message);

  res.json({
    reply: response,
  });
};
