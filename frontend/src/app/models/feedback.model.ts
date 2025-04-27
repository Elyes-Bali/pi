export interface Feedback {
    id?: number;
    content: string;
    rating: number;
    user: { id: number; name: string }; // User information who left the feedback
  }
  