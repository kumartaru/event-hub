export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
}

export interface Registration {
  id: number;
  event_id: number;
  user_email: string;
  timestamp: string;
}
