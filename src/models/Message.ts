export interface Message {
  id: string; // identificador único
  userId: string; // identificador del usuario / foreign key
  user: string;
  bot: string;
  timestamp: string; // fecha y hora
}
