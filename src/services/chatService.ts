// Chef -> Logica del negocio aqui se cocina la comida, es decir, la respuesta del bot a partir del mensaje del usuario
import { v4 as uuidv4 } from "uuid";
import { readMessage, writeMessage } from "@/repositories/memoryStorage"; // funciones de leer la orden y cocinar la comida
import { Message } from "@/models/Message"; // RECETA

// Posibles intenciones del usuario
type Intent = "greeting" | "status" | "name" | "ask_name" | "unknown";

// 🔧 Normalizar texto (acentos, mayúsculas)
const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// 🧠 Detectar intención
const detectIntent = (msg: string): Intent => {
  const userPrompt = normalize(msg);

  if (
    userPrompt.includes("hola") ||
    userPrompt.includes("buenos dias") ||
    userPrompt.includes("buenas tardes") ||
    userPrompt.includes("buenas noches")
  ) {
    return "greeting";
  }
  if (userPrompt.includes("como estas")) {
    return "status";
  }
    if (userPrompt.includes("como me llamo")) {
      return "ask_name";
    }
  if (userPrompt.includes("me llamo")) {
    return "name";
  }


  return "unknown";
};

// 🧠 Obtener últimos mensajes
export const getRecentMessages = (limit: number = 5): Message[] => {
  const chats = readMessage(); // obtener la conversacion completa del json
  return chats.slice(-limit); // esto trae los ultimos 5 mensajes de la conversacion
};

// 🧠 Función principal del bot
export const handleChat = (msg: string): { reply: string } => {
  const userPrompt = normalize(msg);
  const recentMessages = getRecentMessages();

  const intent = detectIntent(userPrompt);
  const lastMessage = recentMessages[recentMessages.length - 1];

  let botResponse = "";
  let userName: string | null = null;

  // 🔍 Buscar nombre en historial
  for (const m of recentMessages) {
    const normalized = normalize(m.user);

    if (normalized.includes("me llamo")) {
      userName = m.user.split("me llamo")[1]?.trim() || null;
    }
  }

  // 🧠 CONTEXTO: detectar si ya saludó
  const hasGreetedBefore = recentMessages.some((m) =>
    normalize(m.user).includes("hola"),
  );

  // 🎯 Lógica principal
  switch (intent) {
    case "greeting":
      botResponse = hasGreetedBefore
        ? "¡Hola de nuevo! 😄"
        : "🤖 ¡Hola! ¿Cómo puedo ayudarte hoy?";
      break;

    case "status":
      botResponse = "🤖 Estoy bien 😄 ¿Y tú?";
      break;

    case "name": {
      const name = msg.split("me llamo")[1]?.trim();
      const cleanName = name?.replace(/[^\w\s]/gi, "").trim();

      if (!cleanName || cleanName.length < 2 || cleanName.includes("?")) {
        botResponse = "No entendí tu nombre 🤔";
      } else {
        botResponse = `¡Encantado de conocerte, ${cleanName}! 😄`;
      }

      break;
    }

    case "ask_name":
      botResponse = userName
        ? `Te llamas ${userName} 😏`
        : "Aún no me has dicho tu nombre 🤔";
      break;

    case "unknown":
      // 🧠 contexto conversacional
      if (userPrompt.includes("y yo")) {
        if (lastMessage?.bot.includes("¿Y tú?")) {
          botResponse = "¡Seguro estás bien también! 😄";
        } else {
          botResponse = "¿A qué te refieres con 'yo'? 🤔";
        }
      } else {
        botResponse = "🤖 No entendí eso aún, pero estoy aprendiendo 😄";
      }
      break;

    default:
      botResponse =
        "🤖 Lo siento, no entiendo tu mensaje. ¿Puedes reformularlo?";
  }
  // 💾 Guardar mensaje
  const message = readMessage();

  const newMessage: Message = {
    id: uuidv4(),
    user: msg, // guardamos original (no normalizado)
    bot: botResponse,
    timestamp: new Date().toISOString(),
  };

  // Guardar la nueva conversación en el archivo JSON
  writeMessage([...message, newMessage]);
  return { reply: botResponse };
};
