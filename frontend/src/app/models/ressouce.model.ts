export interface Ressource {
    id?: number;
    name: string;
    type: RessourceType; // DATASHOW, CHAIRS
    location: string;
    description: string;
    capacity: string;
  }
  export enum RessourceType {
    DATASHOW = 'DATASHOW',
    CHAIRS = 'CHAIRS',
  }
  