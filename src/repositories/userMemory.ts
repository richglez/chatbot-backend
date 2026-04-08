import fs from "fs";
import path from "path";
import { UserData } from "@/models/UserData";

const getUserPath = (userId: string) => {
  return path.join(__dirname, `../../data/users/${userId}/user.json`);
};

export const readUser = (userId: string): UserData => {
  try {
    const filePath = getUserPath(userId);

    if (!fs.existsSync(filePath)) {
      return { id: userId };
    }
    console.log(`[USER] Reading user ${userId}`);
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "{}");
  } catch {
    return { id: userId };
  }
};

export const writeUser = (userId: string, data: UserData) => {
  const filePath = getUserPath(userId);

  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  console.log(`[USER] Writing user ${userId}`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
