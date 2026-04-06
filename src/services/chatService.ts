// Chef -> Logica del negocio aqui se cocina la comida, es decir, la respuesta del bot a partir del mensaje del usuario
import { v4 as uuidv4 } from "uuid";
import { readConversation, writeConversation } from "../memory/memory"; // funciones de leer la orden y cocinar la comida
import { Message } from "../models/Message"; // RECETA

export const handleChat = (userMessage: string): { reply: string } => {
  const msg = userMessage.toLowerCase();
  const recentMessages = getRecentMessages();

  let botResponse = "";

  // 🧠 CONTEXT
  const hasGreetedBefore = recentMessages.some((m) =>
    m.user.toLowerCase().includes("hola"),
  );

  if (
    msg.includes("hola") ||
    msg.includes("buenos días") ||
    msg.includes("buenas tardes") ||
    msg.includes("buenas noches")
  ) {
    botResponse = hasGreetedBefore
      ? "¡Hola de nuevo! ¿En qué puedo ayudarte de nuevo?"
      : "¡Hola! ¿Cómo puedo ayudarte hoy?";
  }

  // 🧠 CONTEXTO: responder algo dependiente
  else if (msg.includes("y yo")) {
    const lastBotMessage = recentMessages[recentMessages.length - 1]?.bot;

    if (lastBotMessage?.includes("¿Y tú?")) {
      botResponse = "¡Seguro que estás bien también! 😄";
    } else {
      botResponse = "No estoy seguro a qué te refieres 🤔";
    }
  } else if (userMessage.toLowerCase().includes("cómo estás")) {
    botResponse = "¡Estoy bien, gracias por preguntar! ¿Y tú?";
  } else {
    botResponse = "🤖Lo siento, no entiendo tu mensaje. ¿Puedes reformularlo?";
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

export const getRecentMessages = (limit: number = 5): Message[] => {
  const conversation = readConversation();
  return conversation.slice(-limit); // esto trae los ultimos 5 mensajes de la conversacion
};
