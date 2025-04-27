import { Room } from "./room.model";

export interface Session {
    id?: number;
    topic: string;
    startTime: string; // ISO format 'YYYY-MM-DDTHH:mm:ss'
    endTime: string;
    room: Room; // Reference to Room model
  }
  