import fs from "fs";
import path from "path";
import { Message } from "@/models/Message";

// 🔥 función dinámica
const getFilePath = (userId: string) => {
  return path.join(
    __dirname,
    `../../data/conversations/${userId}/conversation.json`,
  );
};

// Leer mensajes
export const readMessage = (userId: string): Message[] => {
  try {
    const filePath = getFilePath(userId);

    if (!fs.existsSync(filePath)) {
      console.log("El archivo no existe, devolviendo lista vacía.");
      return [];
    }

    console.log("[MEMORY] Reading message...");
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.log("Error al leer json", error);
    return [];
  }
};

// Escribir mensajes
export const writeMessage = (userId: string, messages: Message[]): void => {
  try {
    const filePath = getFilePath(userId);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
    console.log("[MEMORY] Writing message...");
  } catch (error) {
    console.log("[MEMORY] Error, no se pudo escribir", error);
  }
};
