// Maneja los datos

import fs from "fs";
import path from "path";
import { Message } from "../models/Message";

const filePath = path.join(__dirname, "../../data/memory.json");

// Leer memoria
export const readConversation = (): Message[] => {
  try {
    if (!fs.existsSync(filePath)) {
      console.log("El archivo no existe, devolviendo lista vacía.");
      return [];
    }
    console.log("[MEMORY] Reading conversation...");
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");

  } catch (error) {
    console.log("Error al leer a json", error);
    return [];
  }
};

export const writeConversation = (message: Message[]): void => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(message, null, 2));
    console.log("[MEMORY] Writing conversation...");
  } catch (error) {
    console.log("[MEMORY] Error, no se pudo escribir el mensaje", error);
  }
};
