export interface Paiement {
    id?: number;
    participant: number;
    amount: number;
    cardnumber: number;
    ccv: number;
    holder: string;
    status: boolean;
  }