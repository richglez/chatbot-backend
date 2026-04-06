// Chefs (cocinadores)
import { v4 as uuidv4 } from "uuid";
import { readConversation, writeConversation } from "../memory/memory";
import { Message } from "../models/Message";

export const handleChat = (userMessage: string): { reply: string } => {
  let botResponse = "";
  const msg = userMessage.toLowerCase();

  if (
    msg.includes("hola") ||
    msg.includes("buenos días") ||
    msg.includes("buenas tardes") ||
    msg.includes("buenas noches")
  ) {
    botResponse = "¡Hola! ¿En qué puedo ayudarte?";
  } else if (userMessage.toLowerCase().includes("cómo estás")) {
    botResponse = "¡Estoy bien, gracias por preguntar! ¿Y tú?";
  } else {
    botResponse = "Lo siento, no entiendo tu mensaje. ¿Puedes reformularlo?";
  }

  // guardar conversacion en archivo json
  const conversation = readConversation();

  const newConversation: Message = {
    id: uuidv4(),
    user: userMessage,
    bot: botResponse,
    timestamp: new Date().toISOString(),
  };

  writeConversation([...conversation, newConversation]);
  return { reply: botResponse };
};
