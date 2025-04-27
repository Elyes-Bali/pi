import { Ressource } from "./ressouce.model";
import { Session } from "./session.model";
import { User } from "./user.model";

export interface Conference {
    id?: number;
    topic: string;
    location: string;
    deadline: string; // ISO format 'YYYY-MM-DD'
    owner: { id: number };
    sessions: Session[];
    ressources: Ressource[];
    participants: number[];
    participantsDetails?: ConferenceParticipation[]; 
    category: string;
    onlineMode: boolean; // NEW
    zoomLink: string;
  }


  export interface ConferenceParticipation {
    user: User; // The user participating in the conference
    accepted: boolean; // The acceptance status of the participant
  }