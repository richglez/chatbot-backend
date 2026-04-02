import { readConversation, writeConversation } from "../memory/memory";
import { Message } from "../models/Message";

export const handleChat = (userMessage: string): string => {
  let botResponse = "";

  if (userMessage.toLowerCase().includes("hola")) {
    botResponse = "¡Hola! ¿En qué puedo ayudarte?";
  } else if (userMessage.toLowerCase().includes("cómo estás")) {
    botResponse = "¡Estoy bien, gracias por preguntar! ¿Y tú?";
  } else {
    botResponse = "Lo siento, no entiendo tu mensaje. ¿Puedes reformularlo?";
  }

  // guardar conversacion en archivo json
  const conversation = readConversation();

  const newConversation: Message = {
    id: "" + Date.now(),
    user: userMessage,
    bot: botResponse,
    timestamp: new Date().toISOString(),
  };

  writeConversation([...conversation, newConversation]);
  return botResponse;
};
