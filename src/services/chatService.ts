// Chef -> Logica del negocio aqui se cocina la comida, es decir, la respuesta del bot a partir del mensaje del usuario
import { v4 as uuidv4 } from "uuid";
import { readConversation, writeConversation } from "../memory/memory"; // funciones de leer la orden y cocinar la comida
import { Message } from "../models/Message"; // RECETA

type Intent = "greeting" | "status" | "unknown";

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const detectIntent = (msg: string): Intent => {
  const userMessage = normalize(msg);
  if (
    userMessage.includes("hola") ||
    userMessage.includes("buenos dias") ||
    userMessage.includes("buenas tardes") ||
    userMessage.includes("buenas noches")
  ) {
    return "greeting";
  } else if (userMessage.includes("como estas")) {
    return "status";
  } else {
    return "unknown";
  }
};

export const handleChat = (msg: string): { reply: string } => {
  const userMessage = normalize(msg);
  const recentMessages = getRecentMessages();

  let botResponse = "";

  const intent = detectIntent(msg);

  const lastMessage = recentMessages[recentMessages.length - 1];

  // 🧠 CONTEXT
  const hasGreetedBefore = recentMessages.some((m) =>
    normalize(m.user).includes("hola"),
  );

  switch (intent) {
    case "greeting":
      botResponse = hasGreetedBefore
        ? "¡Hola de nuevo! 😄"
        : "🤖¡Hola! ¿Cómo puedo ayudarte hoy?";
      break;
    case "status":
      botResponse = "🤖¡Estoy bien, gracias por preguntar! ¿Y tú?";
      break;

    case "unknown":
      if (userMessage.includes("y yo")) {
        if (lastMessage?.bot.includes("¿Y tú?")) {
          botResponse = "¡Seguro estás bien también! 😄";
        } else {
          botResponse = "¿A qué te refieres con 'yo'? 🤔";
        }
      } else {
        botResponse = "¿A qué te refieres con 'yo'? 🤔";
      }
      break;
    default:
      botResponse =
        "🤖Lo siento, no entiendo tu mensaje. ¿Puedes reformularlo?";
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
  const chat = readConversation();
  return chat.slice(-limit); // esto trae los ultimos 5 mensajes de la conversacion
};
